import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { languages } from "../Data/languages";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export const Dict: React.FC = () => {
  const classes = useStyles();

  const [meanings, setMeanings] = useState<AxiosResponse | any | Object>([]);
  const [word, setWord] = useState<String | null>("");
  const [lang, setLang] = useState<String | null>("en");

  const fetchData: Function = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`
      );
      // if (data.status === 404) {
      // setMeanings(null);
      // } else {
      setMeanings(data.data);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [word, lang]);

  return (
    <div className={classes.root}  >
      <Typography variant="h1" gutterBottom>
            Dictionary App
          </Typography>
      <div className="main-container">
        {/* Left Column: Search Inputs */}
        <div className="input-panel">
          
          <TextField
            onChange={(e) => setWord(e.target.value)}
            id="word"
            placeholder="Type the word..."
            variant="outlined"
          />
          <TextField
            id="lang"
            select
            label="Language"
            variant="outlined"
            onChange={(e) => setLang(e.target.value)}
            value={lang}
          >
            {languages.map((language, index) => (
              <MenuItem key={index} value={language.value}>
                {language.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
  
        {/* Right Column: Definitions */}
        <div className="result-panel">
          {meanings?.map((meaning: any) => (
            <div key={meaning.word}>
              <Typography variant="h4" className="word-title">
                {meaning.word}
              </Typography>
              {meaning.meanings.map((WM: any, i: number) => (
                <div className="word-section" key={i}>
                  <Typography variant="subtitle1" className="part-of-speech">
                    {WM.partOfSpeech}
                  </Typography>
                  {WM.definitions.map((def: any, j: number) => (
                    <Typography key={j} className="definition">
                      • {def.definition}
                    </Typography>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};
