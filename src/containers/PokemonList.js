/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemonList } from "../actions/pokemonActions";
import { useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PokemonList = (props) => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  console.log(pokemonList, "list from selector");

  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };
  const Showdata = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return pokemonList.data.map((el) => {
        return (
          <div className={"list-wrapper"}>
            <div className={"pokemom-item"}>
              <p>{el.name}</p>
              <Link to={`/pokemon/${el.name}`}>View</Link>
            </div>
          </div>
        );
      });
    }
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }
    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }
    return <p>unable to get data</p>;
  };

  return (
    <div>
      <div className={"search-wrapper"}>
        <p>Search:</p>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>
          Search
        </button>
      </div>
      {Showdata()}

      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPageDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"paginaton"}
        />
      )}
    </div>
  );
};
export default PokemonList;
