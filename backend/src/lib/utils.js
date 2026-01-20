import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true, //prevent XSS attacks JS can't read it like in localStorage
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}

// A cookie is a small piece of data that the server stores in the user’s browser.
// “Hey browser, keep this note for me and send it back every time you talk to me again.”
// So once the cookie is set:
// The browser automatically sends it with every future request to your backend
// You don’t have to manually attach it in headers every time