import { StyleSheet } from 'react-native';

export const COLORS = {
  bgDark: '#090d16',
  bgSurface: '#0e1422',
  bgCard: '#131b2e',
  bgCardHover: '#1a243d',
  bgGlass: 'rgba(255, 255, 255, 0.04)',
  
  border: 'rgba(255, 255, 255, 0.09)',
  borderActive: 'rgba(56, 189, 248, 0.4)',
  
  primary: '#38bdf8',
  primaryGlow: 'rgba(56, 189, 248, 0.25)',
  accentPurple: '#c084fc',
  accentIndigo: '#818cf8',
  accentEmerald: '#34d399',
  accentAmber: '#fbbf24',
  accentRose: '#f43f5e',

  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textInverse: '#090d16',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADII = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 9999,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.pill,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButtonText: {
    color: '#040914',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: COLORS.bgGlass,
    borderRadius: RADII.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButtonText: {
    color: COLORS.textMain,
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: RADII.pill,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  badgePurple: {
    backgroundColor: 'rgba(192, 132, 252, 0.12)',
    borderColor: 'rgba(192, 132, 252, 0.3)',
  },
  badgePurpleText: {
    color: COLORS.accentPurple,
  },
  badgeEmerald: {
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  badgeEmeraldText: {
    color: COLORS.accentEmerald,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.textMain,
    fontSize: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMain,
    marginBottom: 6,
  },
});
