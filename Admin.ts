const adminList = [
    "6JMCRv1KnggQWhYxIzBvnV3rHsn1"
]

export function checkAdmin(uid: string) {
    if (uid in adminList) {
        return true;
    }
    return false;
}
