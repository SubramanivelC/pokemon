import {React, useState, useEffect} from 'react';
import Pokemon from '../components/pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';


const fetchPokemonData = async (len) => {
  const fetchdata = [];
  for (let i = len; i < len + 10; i++) {
    fetchdata.push(
      (await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)).json()
    );
  }
  const resolvedData = await Promise.all(fetchdata);
  return resolvedData.map((item) => {
    return {
      id:item.id,
      name:item.name,
      height:item.height,
      weight:item.weight,
      base_experience:item.base_experience

      
    };
    console.log(resolvedData);

  });
};





export default function Home() {
  const [searchtext, setSearchtext] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(true);

   

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMessage("Loading...");
      const resp = await fetchPokemonData(1);
      console.log(resp)
      setData(resp);
      setLoading(false);}
    fetchData();
  }, []);

  
    window.onscroll = () => {
    if (
      (window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight)
    ) {
      setMessage("Loading...");
      setLoading(true);
      fetchPokemonData(data.length+1).then((newPokemons) => {
        setData([...data, ...newPokemons]);
        setLoading(false);

      });
    }
    
  };

  // console.log(data)


  const searchHandler = (event) =>{
    console.log(event.target.value)
    setSearchtext(event.target.value);
  };

  

  function Search(datas) {
    const Titles = datas[0] && Object.keys(datas[0])

    return(datas.filter((row) => Titles.some((title)=>row[title].toString().toLowerCase().indexOf(searchtext.toLowerCase()) > -1 )))
  };
  return (
    <div>
    <div className="search">
    <input type="text" placeholder="Enter name or weight or height or base_experience" onChange={searchHandler} />

    </div>

    <div className="container">
        <div className="row row-cols-1 row-cols-md-5 g-4">

        {Search(data).map((data, index) => (
          <div className="card" key={"num" + index}>
            <Pokemon key={data.id} id={data.id} name={data.name} height={data.height} 
                              weight={data.weight} base_experience={data.base_experience} data={data}/>
          </div>
        ))}
        {isLoading && <h1 className="pokemonName">{message}</h1>}
      </div>
    </div>
    </div>
  );
}