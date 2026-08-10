import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  startIcon,
  endIcon,
  disabled = false,
  style,
  inputStyle,
  ...props
}) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.textMain }]}>{label}</Text>}

      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: colors.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
            borderColor: error
              ? colors.accentRose
              : isFocused
              ? colors.primary
              : colors.border,
          },
          disabled && styles.disabled,
        ]}
      >
        {startIcon && <Icon name={startIcon} size={18} color={colors.textDim} />}

        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textDim}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, { color: colors.textMain }, inputStyle]}
          {...props}
        />

        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setIsSecureVisible(!isSecureVisible)}>
            <Icon name={isSecureVisible ? 'lock' : 'forgotPassword'} size={18} color={colors.textDim} />
          </TouchableOpacity>
        ) : endIcon ? (
          <Icon name={endIcon} size={18} color={colors.textDim} />
        ) : null}
      </View>

      {error ? <Text style={[styles.errorText, { color: colors.accentRose }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RADII.sm,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default TextInput;
