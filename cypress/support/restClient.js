export class RestClient {
    sendGetRequest(apiUrl) {
        return cy.request({
            method: 'GET',
            url: apiUrl
        })
    }
    sendPostRequest(apiUrl, requestHeader, requestPayLoad) {
        return cy.request({
            method: 'POST',
            url: apiUrl,
            headers: requestHeader,
            body: requestPayLoad
        }).then((response) => { Cypress.env('slug', response.body.article.slug) })
    }
    sendPutRequest(apiUrl, requestHeader, requestPayLoad) {
        return cy.request({
            method: 'PUT',
            url: apiUrl,
            headers: requestHeader,
            body: requestPayLoad
        }).then((response) => { Cypress.env('slug', response.body.article.slug) })

    }

    sendDeleteRequest(apiUrl, requestHeader) {
        return cy.request({
            method: 'DELETE',
            url: apiUrl,
            headers: requestHeader
        })

    }

}
export const restClient = new RestClient();