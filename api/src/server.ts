import App from './app'

const servcr = new App({
    port: 5000,
})
servcr.listen()

export default servcr.app
