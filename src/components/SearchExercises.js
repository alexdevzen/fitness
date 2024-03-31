import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

// Definición del componente funcional SearchExercises
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  // Definición de estados locales usando el hook useState
  const [search, setSearch] = useState(''); // Estado para almacenar el término de búsqueda
  const [bodyParts, setBodyParts] = useState([]); // Estado para almacenar las partes del cuerpo

  // Efecto secundario que se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para cargar los datos de las partes del cuerpo
    const fetchExercisesData = async () => {
      // Llamada a la función fetchData para obtener los datos de las partes del cuerpo
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      // Actualización del estado de las partes del cuerpo
      setBodyParts(['all', ...bodyPartsData]);
    };
    // Llamada a la función fetchExercisesData para cargar los datos
    fetchExercisesData();
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta, ya que el array de dependencias está vacío

  // Función para manejar la búsqueda de ejercicios
  const handleSearch = async () => {
    if (search) {
      // Llamada a la función fetchData para obtener los datos de ejercicios
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
      // Filtrado de ejercicios que coincidan con el término de búsqueda
      const searchedExercises = exercisesData.filter((exercise) =>
        exercise.name.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
        || exercise.equipment.toLowerCase().includes(search)
      );
      // Reiniciar el término de búsqueda
      setSearch("");
      // Actualizar el estado de los ejercicios con los ejercicios filtrados
      setExercises(searchedExercises);
    }
  };



  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Ejercicios Impresionantes <br />
        Que Debes Saber
      </Typography>

      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Buscar Ejercicios"
          type="text"
        />

        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          p: "20px",
        }}
      >
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
