/// <reference types="cypress"/>

import { restClient } from "../../support/restClient";


describe("API Testing of Conduit App", function () {
    let token;

    beforeEach(() => {
        cy.logingToApplication('mo@mo.com', 'admin')
        token = Cypress.env('token')
    })
    it("Get Tags API", () => {
        restClient.sendGetRequest("http://localhost:3000/api/tags")
            .then(response => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.equal(200)
                expect(response.body.tags).to.contains('Cypress')
            })

    })

    it('Add Article', () => {
        restClient.sendPostRequest("http://localhost:3000/api/articles",
            {
                "Authorization": 'Token ' + token
            },
            {
                "article": {
                    "title": "Cypress articles",
                    "description": "This is regarding Cypress",
                    "body": "Cypress is a test automation tool",
                    "tagList": [
                        "Cypress",
                        "Test"
                    ]
                }
            }
        )
            .then(response => {
                expect(response.status).is.equal(200)
            })
    })

    it('Edite Article', () => {
        restClient.sendPostRequest("http://localhost:3000/api/articles",
            {
                "Authorization": 'Token ' + token
            },
            {
                "article": {
                    "title": "Cypress articles",
                    "description": "This is regarding Cypress",
                    "body": "Cypress is a test automation tool",
                    "tagList": [
                        "Cypress",
                        "Test"
                    ]
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                let slug = Cypress.env('slug')
                cy.log(slug)

                //Edit Article
                restClient.sendPutRequest('http://localhost:3000/api/articles/' + slug,
                    {
                        "Authorization": 'Token ' + token
                    },
                    {
                        "article": {
                            "title": "Cypress articles Edited v1",
                            "description": "This is regarding Cypress edited",
                            "body": "Cypress is a test automation tool",
                            "tagList": [
                                "Cypress",
                                "Test"
                            ]
                        }
                    }
                )
                    .then(response => {
                        expect(response.status).is.equal(200)
                        expect(response.body.article.title).to.equal('Cypress articles Edited v1')
                    })
            })

    })
    it('Delete Article', () => {

        restClient.sendPostRequest("http://localhost:3000/api/articles",
            {
                "Authorization": 'Token ' + token
            },
            {
                "article": {
                    "title": "Cypress articles",
                    "description": "This is regarding Cypress",
                    "body": "Cypress is a test automation tool",
                    "tagList": [
                        "Cypress",
                        "Test"
                    ]
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                let slug = Cypress.env('slug')
                cy.log(slug)


                //Delete Article
                restClient.sendDeleteRequest('http://localhost:3000/api/articles/' + slug,
                    {
                        "Authorization": 'Token ' + token
                    }
                )
                .then(response => {
                    expect(response.status).is.equal(204)

                })
            })

    })
})