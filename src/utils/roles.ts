import { getDb } from '../lib/mongodb';

export type UserRole = 'admin' | 'poles' | 'vip' | 'clients';

export interface UserRoleRecord {
  email: string;
  role: UserRole;
  userId?: string;
  name?: string;
  assignedPoles?: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
}

export const ROLE_DEFINITIONS: Record<UserRole, {
  id: UserRole;
  label: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  icon: string;
}> = {
  admin: {
    id: 'admin',
    label: 'Administrateur',
    description: 'Accès total à la console, gestion du site, tarifs, et configuration des rôles utilisateurs.',
    color: '#d4af37',
    badgeBg: 'rgba(212, 175, 55, 0.15)',
    badgeBorder: '#d4af37',
    badgeText: '#f6d365',
    icon: '👑'
  },
  poles: {
    id: 'poles',
    label: 'Responsable Pôle',
    description: 'Accès opérationnel aux commandes, réparations, fastpass et téléversements du ou des pôles assignés.',
    color: '#0096ff',
    badgeBg: 'rgba(0, 150, 255, 0.15)',
    badgeBorder: '#0096ff',
    badgeText: '#60a5fa',
    icon: '🏢'
  },
  vip: {
    id: 'vip',
    label: 'Client VIP',
    description: 'Client privilégié avec accès prioritaire FastPass, remises exclusives et service personnalisé.',
    color: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeBorder: '#a855f7',
    badgeText: '#c084fc',
    icon: '⭐'
  },
  clients: {
    id: 'clients',
    label: 'Client Standard',
    description: 'Client enregistré avec compte sécurisé. Accès au suivi des démarches et panier.',
    color: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: '#10b981',
    badgeText: '#34d399',
    icon: '👤'
  }
};

export const POLE_OPTIONS = [
  { id: 'studio', label: '📸 Studio Photo Pro' },
  { id: 'reparation', label: '⚡ Réparation Express & Yango' },
  { id: 'boutique', label: '🛍️ Boutique High-Tech' },
  { id: 'bureautique', label: '🖨️ Bureautique & PAO' },
  { id: 'mobile-money', label: '📱 Mobile Money & FastPass' }
];

export function getHardcodedAdminEmails(): string[] {
  const envEmails = (import.meta.env && import.meta.env.ADMIN_EMAILS) || process.env.ADMIN_EMAILS || 'hi.cyril@gmail.com,legion.athenienne@gmail.com';
  return envEmails
    .split(/[\s,]+/)
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isHardcodedAdmin(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getHardcodedAdminEmails().includes(normalized);
}

export async function getUserRole(
  email?: string | null,
  userId?: string | null
): Promise<{
  role: UserRole;
  assignedPoles: string[];
  isHardcodedAdmin: boolean;
  notes?: string;
  source: 'env' | 'database' | 'default';
}> {
  const normalizedEmail = (email || '').trim().toLowerCase();

  // 1. Fallback permanent : Emails propriétaires configurés dans les variables d'environnement
  if (normalizedEmail && isHardcodedAdmin(normalizedEmail)) {
    return {
      role: 'admin',
      assignedPoles: POLE_OPTIONS.map(p => p.id),
      isHardcodedAdmin: true,
      notes: 'Super-administrateur racine (défini par variable d\'environnement)',
      source: 'env'
    };
  }

  // 2. Vérification dans MongoDB (collection user_roles)
  try {
    const db = await getDb();
    const query: any = {};
    if (normalizedEmail && userId) {
      query.$or = [{ email: normalizedEmail }, { userId: userId }];
    } else if (normalizedEmail) {
      query.email = normalizedEmail;
    } else if (userId) {
      query.userId = userId;
    } else {
      return { role: 'clients', assignedPoles: [], isHardcodedAdmin: false, source: 'default' };
    }

    const doc = await db.collection<UserRoleRecord>('user_roles').findOne(query);
    if (doc && doc.role && ['admin', 'poles', 'vip', 'clients'].includes(doc.role)) {
      return {
        role: doc.role,
        assignedPoles: doc.assignedPoles || (doc.role === 'admin' ? POLE_OPTIONS.map(p => p.id) : []),
        isHardcodedAdmin: false,
        notes: doc.notes,
        source: 'database'
      };
    }
  } catch (err) {
    console.error('Erreur lors de la lecture des rôles dans MongoDB:', err);
  }

  // 3. Rôle par défaut
  return {
    role: 'clients',
    assignedPoles: [],
    isHardcodedAdmin: false,
    source: 'default'
  };
}

export function canAccessAdmin(role: UserRole): boolean {
  return role === 'admin' || role === 'poles';
}

export function canManageRoles(role: UserRole): boolean {
  return role === 'admin';
}

export function canManageSiteConfig(role: UserRole): boolean {
  return role === 'admin';
}
