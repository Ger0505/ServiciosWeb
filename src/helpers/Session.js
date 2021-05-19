import Cookies from 'cookie-universal'

const MIN = 60

const cookies = Cookies()
// Una hora, segundo parámetro
class Session{
    crearSession(data){
        cookies.set("_s", data, {
            path: "/",
            expires: new Date(new Date().getTime() + 60 * MIN * 1000)  
        })
    }

    getSession(){
        return cookies.get("_s") === undefined ? false:cookies.get("_s")
    }

    removeSession(){
        cookies.remove("_s")
    }

    renovarSession(){
        const sesion =  this.getSession()
        if(!sesion){
            window.location.href = "/"
        }
        cookies.set("_s", sesion, {
            path: "/",
            expires: new Date(new Date().getTime() + 60 * MIN * 1000) 
        })
    
        return sesion
    }
}

export default new Session()
