async function verifyToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado");
    }

    const response = await axios.get("http://localhost:3000/auth/verify-token", {
        headers: {
            Authorization: token,
        },
    })
    if (response.status === 401) {
        throw new Error(response.data.msg);
    }
    return response.data.userId
}