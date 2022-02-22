import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { supabase } from "../../config/supabaseClient";
import Swal from "sweetalert2";
import { i18n } from "../../ES-EN"


const card = {
  id: "",
  title: "",
  content: "",
  due: "",
  created_at: "",
  userid: ""
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid green",
  boxShadow: 24,
  p: 4,
};

export default function BasicModalCards({ open, handleClose, session }) {

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [due, setDue] = useState("");
  const [loading, setLoading] = useState(false);

  const createDate = () => {
    let d = new Date();
    let DATE =
      d.getDay() +
      "-" +
      d.getMonth() +
      "-" +
      d.getFullYear() +
      " @ " +
      d.getHours() +
      ":";
    if (d.getMinutes() < 10) {
      DATE = DATE + "0" + d.getMinutes();
    } else {
      DATE = DATE + d.getMinutes();
    }
    return DATE;
  };

  const GetId = async  () =>{
    
    let {data, error} = await supabase
    .from("cards")
    .select("id")
    .single()
    .limit(1);

    if(data){
        //console.log("Si devolví datos: ", data)
        setId(parseInt(data.id + 1));
        
    }else{
      throw error;
      
    }
  }

  const SendCard = async (title, content, due) => {
    setLoading(true);
    const user = supabase.auth.user();
    
      card.id = id;
      card.title = title;
      card.content = content;
      card.due = due;
      card.created_at = createDate();
      card.userid = user.id;

      let {data, error} = await supabase
    .from("cards")
    .insert(card);

    if(!data){ 
      //console.log(card);
      setLoading(false);
      throw error;
    }else{
      setLoading(false);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="form-widget">
            <div>
              <label htmlFor="title">{i18n.t("title")}</label>
              <input 
              id="title" 
              type="text"
              
              onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="content">{i18n.t("content")}</label>
              <input
                id="content"
                type="text"
                
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="due">{i18n.t("due")}</label>
              <input
                id="due"
                type="date"
                
                onChange={(e) => setDue(e.target.value)}
              />
            </div>

            <div>
              <button
                className="button block primary"
                onClick={() => { 
                  GetId(); 
                  SendCard(title, content, due);
                }
                }
                disabled={loading}
              >
                {loading ? i18n.t("loading") : i18n.t("save")}
              </button>
            </div>

            <div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
