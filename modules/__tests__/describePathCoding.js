import expect from 'expect'
import { PUSH, POP } from '../Actions'
import execSteps from './execSteps'

const describePathCoding = (createHistory) => {
  describe('with the "hashbang" hashType', () => {
    let history
    beforeEach(() => {
      history = createHistory({
        hashType: 'hashbang'
      })
    })

    // Some browsers need a little time to reflect the
    // hashchange before starting the next test
    afterEach(done => setTimeout(done, 100))

    describe('createHref', () => {
      it('knows how to make hrefs', () => {
        expect(history.createHref('/a/path')).toEqual('#!/a/path')
      })
    })

    describe('back', () => {
      it('calls change listeners with the previous location', (done) => {
        const steps = [
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('#!')

            history.push({
              pathname: '/home',
              search: '?the=query',
              state: { the: 'state' }
            })
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(PUSH)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#!\/home/)

            history.goBack()
          },
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('#!')
          }
        ]

        execSteps(steps, history, done)
      })
    })

    describe('forward', () => {
      it('calls change listeners with the next location', (done) => {
        const steps = [
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('#!')

            history.push({
              pathname: '/home',
              search: '?the=query',
              state: { the: 'state' }
            })
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(PUSH)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#!\/home/)

            history.goBack()
          },
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('#!')

            history.goForward()
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(POP)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#!\/home/)
          }
        ]

        execSteps(steps, history, done)
      })
    })
  })

  describe('with the "noslash" hashType', () => {
    let history
    beforeEach(() => {
      history = createHistory({
        hashType: 'noslash'
      })
    })

    // Some browsers need a little time to reflect the
    // hashchange before starting the next test
    afterEach(done => setTimeout(done, 100))

    describe('createHref', () => {
      it('knows how to make hrefs', () => {
        expect(history.createHref('/a/path')).toEqual('#a/path')
      })
    })

    describe('back', () => {
      it('calls change listeners with the previous location', (done) => {
        const steps = [
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('')

            history.push({
              pathname: '/home',
              search: '?the=query',
              state: { the: 'state' }
            })
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(PUSH)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#home/)

            history.goBack()
          },
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('')
          }
        ]

        execSteps(steps, history, done)
      })
    })

    describe('forward', () => {
      it('calls change listeners with the next location', (done) => {
        const steps = [
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('')

            history.push({
              pathname: '/home',
              search: '?the=query',
              state: { the: 'state' }
            })
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(PUSH)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#home/)

            history.goBack()
          },
          (location) => {
            expect(location.pathname).toEqual('/')
            expect(location.search).toEqual('')
            expect(location.state).toBe(undefined)
            expect(location.action).toEqual(POP)
            expect(location.key).toBe(null)

            expect(window.location.hash).toEqual('')

            history.goForward()
          },
          (location) => {
            expect(location.pathname).toEqual('/home')
            expect(location.search).toEqual('?the=query')
            expect(location.state).toEqual({ the: 'state' })
            expect(location.action).toEqual(POP)
            expect(location.key).toExist()

            expect(window.location.hash).toMatch(/^#home/)
          }
        ]

        execSteps(steps, history, done)
      })
    })
  })
}

export default describePathCoding