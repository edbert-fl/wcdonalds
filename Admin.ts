const adminList = [
    "6JMCRv1KnggQWhYxIzBvnV3rHsn1"
]

export function isAdmin(uid: string) {
    if (adminList.includes(uid)) {
        return true;
    }
    return false;
}
