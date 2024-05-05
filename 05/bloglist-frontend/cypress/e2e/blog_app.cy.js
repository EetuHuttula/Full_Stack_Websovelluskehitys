describe('blog',  function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.request('POST', `http://localhost:3001/api/testing/reset`)
    const user = {
      name: 'epeH',
      username: 'eetuH',
      password: 'eetuH'
    }
    cy.request('POST', `http://localhost:3001/api/users`, user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('username')
    cy.contains('password')
  })
    describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
      cy.get('#username').type('eetuH')
      cy.get('#password').type('eetuH')
      cy.get('#login-button').click()
      cy.contains('epeH logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.visit('http://localhost:5173')
      cy.contains('Login').click()
      cy.get('#username').type('eetuH')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
      cy.get('html').should('not.contain', 'epeH logged in')
    })
  })  
describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('eetuH')
      cy.get('#password').type('eetuH')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'Revenge of the sith',
        author: 'Epecheese',
        url: 'Thungberryapping.com'
      })
    })
    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Revenge of the sith',
        author: 'Epecheese',
        url: 'Thungberryapping.com'
      })
      cy.get('#show').click()
      cy.contains('Revenge of the sith')
      cy.get('#likeBtn').click()
      cy.get('#likeBtn').click()
      cy.wait(1000)
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'Revenge of the sith',
        author: 'Epecheese',
        url: 'Thungberryapping.com'
      })
      cy.wait(5000)
      cy.get('#show').click()
      cy.get('#deleteButton').click({ force: true})
      cy.get('html').should('not.contain', 'Revenge of the sith')
    })

    it('remove button is only shown to the blog poster', function() {
      cy.createBlog({
        title: 'Revenge of the sith',
        author: 'Epecheese',
        url: 'yapper.com'
      })
      cy.wait(1000)
      cy.visit('')
      cy.contains('Logout').click()
      const user1 = {
        name: 'Epe2h',
        username: 'eetu2H',
        password: 'eetu2H'
      }
      cy.request('POST', `http://localhost:3001/api/users`, user1)
      cy.get('#username').type('eetu2H')
      cy.get('#password').type('eetu2H')
      cy.get('#login-button').click()
      cy.contains('Epe2h logged in')
      cy.contains('Revenge of the sith')
      cy.get('#show').click()
      cy.contains('Revenge of the sith').should('not.contain', 'delete')
    })
    it('Blogs are ordered by likes, with the blog with the most likes first', function() {
      cy.createBlog({
        title: 'Blog with 3 likes',
        author: 'Epecheese',
        url: 'example.com'
      })
      cy.createBlog({
        title: 'Blog with 2 likes',
        author: 'Epecheese',
        url: 'example.com'
      })
      cy.createBlog({
        title: 'Blog with 1 like',
        author: 'Epecheese',
        url: 'example.com'
      })
    
      // Like the blogs in a specific order
      cy.contains('Blog with 3 likes').parent().find('#show').click()
      cy.contains('Blog with 3 likes').parent().find('#likeBtn').click()
      cy.contains('Blog with 3 likes').parent().find('#likeBtn').click()
      cy.contains('Blog with 3 likes').parent().find('#likeBtn').click()
    
      cy.contains('Blog with 2 likes').parent().find('#show').click()
      cy.contains('Blog with 2 likes').parent().find('#likeBtn').click()
      cy.contains('Blog with 2 likes').parent().find('#likeBtn').click()
      cy.contains('Blog with 2 likes').parent().find('#likeBtn').click()

    
      cy.contains('Blog with 1 like').parent().find('#show').click()
      cy.contains('Blog with 1 like').parent().find('#likeBtn').click()
      cy.contains('Blog with 1 likes').parent().find('#likeBtn').click()
      cy.contains('Blog with 1 likes').parent().find('#likeBtn').click()
      // Refresh the page to ensure the blogs are reordered
      cy.reload()
    
      cy.get('.blog').eq(0).should('contain', 'Blog with 3 likes')
      cy.get('.blog').eq(1).should('contain', 'Blog with 2 likes')
      cy.get('.blog').eq(2).should('contain', 'Blog with 1 like')
    })
  })
})