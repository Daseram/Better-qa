describe("Top Movies selection", () => {
    it("Should display movie tiles", () => {
        cy.visit("https://top-movies-qhyuvdwmzt.now.sh/");
        cy.get(".movies").children().its("length").should("be.greaterThan", 1);
        cy.get(".movies").children().each($movie => {
            expect($movie.get(0).childElementCount).to.equal(3);
            expect($movie.get(0).children[0].className).to.contain("movie-image");
            expect($movie.get(0).children[0].getAttribute("style")).to.contain("background-image");
        })
    })

    it("Should open movie and check release date", () => {
        cy.get(".movie-card > div[title*='The Shawshank Redemption']").nextUntil("div > button").find("button").click();
        cy.get("div").contains("Released on").next().children().should("have.value", "1994-09-23");
        cy.get("div > button").contains("Close").click();
    })

    it("Should search for a movie and check that exists", () => {
        cy.get("header").find("input").type("Star trek{enter}");
        cy.get(".movie-card > div[title*='Star Trek: First Contact']").should('exist').and("be.visible");
        cy.get(".movie-card > div[title*='The Shawshank Redemption']").should('not.exist');
        cy.get("header").find("input").clear();
    })

    it("Should pick a movie and check the info is correct", () => {
        cy.get("header").find("input").type("Cloverfield{enter}");
        cy.get(".movie-card > div[title*='Cloverfield']").first().nextUntil("div > button").find("button").click();
        cy.get("div").contains("Released on").next().children().should("have.value", "2008-01-15");
        cy.get("div").contains("Popularity").next().children().should("have.value", "26.89");
        cy.get("div").contains("Vote average").next().children().should("have.value", "6.6");
        cy.get("div").contains("Vote count").next().children().should("have.value", "5299");
        cy.get("div > button").contains("Close").click();        
    })

    it("Should return to main page when the search is clear", () => {
        cy.get("header").find("input").clear();
        cy.get("header").find("input").type("{enter}");
        cy.wait(1000);
        cy.get(".movies").children().its("length").should("be.greaterThan", 1);
    })
})