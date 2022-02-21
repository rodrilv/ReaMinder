import { Cards } from "../Card";
import React, { Fragment, useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import { Grid } from "@mui/material";
import { supabase } from "../../config/supabaseClient";


export default function Dashboard({ session }) {
  const [card, setCard] = useState([]); 

  useEffect(() => {
    GetCards();
  }, [card]);

  const GetCards = async () => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("cards")
      .select("id, title, content, due, created_at")
      .eq("userid", user.id);

    if (data) {
      setCard(data);
    } else {
      throw error;
    }
  };

  return (
    <Fragment>
      <Navbar session={session} />
      <Grid
        item
        container
        columnSpacing={{ xs: 6, md: 5 }}
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 2 }}
        padding={1}
      >
        {card &&
          card.map((cd, index) => (
            <Cards
              key={index}
              id={cd.id}
              title={cd.title}
              content={cd.content}
              due={cd.due}
              createdAt={cd.created_at}
            />
          ))}
      </Grid>
    </Fragment>
  );
}
