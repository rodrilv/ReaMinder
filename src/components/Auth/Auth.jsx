import { useState } from 'react'
import { supabase } from '../../config/supabaseClient'
import { i18n }from "../../ES-EN"
import { Button, ButtonGroup } from "@mui/material";
import Swal from 'sweetalert2'


export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  /*useEffect(()=>{
    if(!cookie.get("ln")){
      cookie.remove("ln");
      cookie.set("ln", "es")
    }
  }, [cookie])*/

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert(i18n.t("magic"))
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const changeLanguage = () =>{
    if(window.localStorage.getItem("i18nextLng") === "es-ES"){
      window.localStorage.setItem("i18nextLng", "en-EN")
      Swal.fire(i18n.t("refresh"));
    }else{
      window.localStorage.setItem("i18nextLng", "es-ES");
      Swal.fire(i18n.t("refresh"));
      
    }
    
  }

  return (
    
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
      <ButtonGroup style={{marginLeft: 15}} color="secondary" variant="outlined" aria-label="outlined button group">
        <Button variant="contained" onClick={() =>changeLanguage()}
          >ES/EN</Button>
      </ButtonGroup>
        <h1 className="header">ReaMinder</h1>
        <p className="description">{i18n.t("signin")}</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder={i18n.t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>{i18n.t("loading")}</span> : <span>{i18n.t("sendMagic")}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}