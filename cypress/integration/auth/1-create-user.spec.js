// clickRecaptcha

function buildRequestInfo(body) {
    return {
        method: 'POST',
        url: '/Account/v1/User',
        body: body,
        failOnStatusCode: false
    };
}

describe('Registration tests', () => {
        it('Should create an account', () => {
            let username = 'temp_user_' + Date.now()
            let password = 'sTr0ng!!!?'
            let body = {"userName": username, "password": password}
            let requestInfo = buildRequestInfo(body)
            cy.request(requestInfo).its('status').should('eq', 201)

        })

        it('Should fail with empty username', () => {
            let body = {"userName": "", "password": "Qwerty@1234"}
            let expectedError = 'UserName and Password required.'
            let requestInfo = buildRequestInfo(body);
            cy.request(requestInfo).then(response => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq(expectedError)
            })
        })

        it('Should fail with empty password', () => {
            let body = {"userName": "someone", "password": ""}
            let expectedError = 'UserName and Password required.'
            let requestInfo = buildRequestInfo(body);
            cy.request(requestInfo).then(response => {
                expect(response.status).to.eq(400)
                expect(response.body.message).eq(expectedError)
            })
        })

        it('Should fail with weak passwords', () => {

            let weakPasswordTests = [
                {'password': 'Sh0rt!', 'message': 'violates at least 8 chars rule'},
                {'password': 't00Simple', 'message': 'violates at least one non-alphanumeric char rule'},
                {'password': 'NoDigitsIsBad!', 'message': 'violates at least one digit rule'},
                {'password': 'n0uppercase!', 'message': 'violates at least one uppercase rule'},
                {'password': 'N0LOWERCASE!', 'message': 'violates at least one lowercase rule'},
            ]

            for (let test of weakPasswordTests) {
                let body = {"userName": "someone", "password": test['password']}
                let requestInfo = buildRequestInfo(body)
                let testMsg = test['message']
                cy.request(requestInfo).then(response => {
                    cy.wrap(response.status).should('eq', 400)
                    cy.wrap(response.body.message)
                        .should('contain', 'Passwords must have', testMsg)
                })
            }

        })
    }
)