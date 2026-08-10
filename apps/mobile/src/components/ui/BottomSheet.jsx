import React from 'react';
import { View, Text, StyleSheet, Modal as RNModal, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function BottomSheet({ visible = false, onClose, title, children }) {
  const { colors } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.touchBackdrop} activeOpacity={1} onPress={onClose} />

        <View style={[styles.panel, { backgroundColor: colors.bgSurface, borderColor: colors.border }]}>
          <View style={styles.dragHandleWrap}>
            <View style={[styles.dragHandle, { backgroundColor: colors.border }]} />
          </View>

          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            {title && <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>}
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  touchBackdrop: {
    flex: 1,
  },
  panel: {
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
    borderWidth: 1,
    paddingBottom: 24,
    maxHeight: '80%',
  },
  dragHandleWrap: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: SPACING.md,
  },
});

export default BottomSheet;
