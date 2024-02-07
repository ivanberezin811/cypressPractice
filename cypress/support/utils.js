
export const visitPage = (additionalPath) => {
    cy.visit('/' + additionalPath)
}

export const loginViaAPI = (user) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            Email: user.email,
            Password: user.password,
            RememberMe: false
        }
    })
}