import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { i18n } from "../../ES-EN"
import { supabase } from "../../config/supabaseClient";
import Swal from "sweetalert2"

/*const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));*/

export default function RecipeReviewCard({ id, title, content, due, createdAt }) {
  const Due = <i>{i18n.t("due")} <Typography variant="caption">{due}</Typography></i>

  const DeleteCard = async () =>{
    const {data, error} = await supabase
    .from("cards")
    .delete()
    .match({'id' : parseInt(id)}, {
      returning: "minimal"
    });
    if(data){
      Swal.fire({
        title: i18n.t("a-success"),
        icon: 'success'
      })
    }else{
      Swal.fire({
        title: i18n.t("a-fail"),
        icon: 'error'
      });
      throw error;
    }
  }

  return (
    <Card
      sx={{
        //maxHeight: 315 ,
        maxWidth: 345,
        marginTop: 5,
        border: "solid #3B3B3B",
        backgroundColor: "#3B3B3B",
        justifyContent: "space-between",
        marginLeft: 6,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#06776F" }} aria-label="recipe">
            !
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={Due}
      />
      
      <CardContent>
        {content+" "}<p><b><i>{i18n.t("created")+createdAt}</i></b></p>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={() => DeleteCard()}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
