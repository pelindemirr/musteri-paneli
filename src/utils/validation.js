// E-posta validasyonu
export function validateEmail(email) {
    if (!email.trim()) return 'E-posta boş bırakılamaz';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Geçerli bir e-posta girin';
    return '';
}

// Telefon validasyonu
export function validatePhone(phone) {
    if (!phone.trim()) return 'Telefon boş bırakılamaz';
    if (phone.replace(/\D/g, '').length < 10) return 'Geçerli bir telefon girin';
    return '';
}

// Ad validasyonu
export function validateName(name) {
    if (!name.trim()) return 'Ad boş bırakılamaz';
    return '';
}

// Şifre validasyonu
export function validatePassword(password) {
    if (!password.trim()) return 'Şifre boş bırakılamaz';
    if (password.length < 6) return 'Şifre en az 6 karakter olmalı';
    return '';
}

// TC Kimlik No validasyonu
export function validateTC(tc) {
    if (!tc.trim()) return 'TC Kimlik No boş bırakılamaz';
    if (!/^\d{11}$/.test(tc)) return 'TC Kimlik No 11 haneli olmalı';
    return '';
} 