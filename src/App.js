import "./App.css";
import { scaleLinear } from "d3-scale";
import { useEffect, useState, useRef } from "react";
import Map from "./components/Map";
import PieChart from "./components/PieChart";
import ProfileAmount from "./components/MapLogics/ProfileAmount";
import DataTable from "./components/DataTable";
import Tooltip from '@mui/material/Tooltip';

function App() {
  const profiles = useRef([]);
  const tableProfiles = useRef([]);
  const [maxPeople, setMaxPeople] = useState(0);
  const [minPeople, setMinPeople] = useState(0);
  const [mapTooltip, setMapTooltip] = useState('');

  // toggles
  const [mapCard, setMapCard] = useState(true);
  const [tableCard, setTableCard] = useState(true);
  const [companyProfileCard, setCompanyProfileCard] = useState(true);

  // Profiles by countries
  const countries = useRef({});
  const colorScale = scaleLinear()
    .domain([minPeople, maxPeople])
    .range(["#f5b8ce", "#bf718e", "#944462", "#731f3e", "#540522"]);

  // Companies by profiles
  const companiesByAmount = useRef({});
  const [companiesByAmountData, setCompaniesByAmountData] = useState([]);
  const [companiesByAmountLabels, setCompaniesByAmountLabels] = useState([]);

  const tableColumns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Full Name", width: 310, minWidth: 200 },
    {
      field: "username",
      headerName: "Username",
      minWidth: 200,
      width: 310,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 200,
      width: 310,
    },
  ];

  const numberByCountry = () => {
    countries.current = {};
    profiles.current.forEach((profile) => {
      if (countries.current[profile.location.country] >= 0) {
        countries.current[profile.location.country]++;
      } else {
        countries.current[profile.location.country] = 1;
      }
    });
    //countries.current = amountByCountries;
    console.log(countries.current, "CURRENT");
    const arr = Object.values(countries.current);
    setMinPeople(Math.min(...arr));
    setMaxPeople(Math.max(...arr));
  };

  function profilesToTable() {
    tableProfiles.current = [];
    profiles.current.forEach((profile, id) => {
      tableProfiles.current.push({
        id,
        name: `${profile.firstName} ${profile.lastName}`,
        username: profile.username,
        location: profile.location?.locationName || "",
      });
    });
    console.log(tableProfiles.current);
  }

  function companiesByAmountProcessor() {
    const arrKeyValue = []
    setCompaniesByAmountData([]);
    setCompaniesByAmountLabels([]);
    Object.keys(companiesByAmount.current).forEach(company => {
      arrKeyValue.push([company, companiesByAmount.current[company]]);
    });
    arrKeyValue.sort((a, b) => b[1] - a[1]);
    for(let i=0;i<15;i++) {
      const labelData = arrKeyValue.shift();
      setCompaniesByAmountData((e) => [...e, labelData[1]]);
      setCompaniesByAmountLabels((e) => [...e, labelData[0]]);
    }
    const others = arrKeyValue.reduce((acc, b) => acc + b[1], 0);
    setCompaniesByAmountData((e) => [...e, others]);
    setCompaniesByAmountLabels((e) => [...e, 'Others']);
  }

  useEffect(() => {
    const callProfiles = async () => {
      const resProfiles = await fetch(process.env.REACT_APP_LINKEDIN_API_LINK);
      const dataProfiles = await resProfiles.json();
      profiles.current = dataProfiles;

      const resCompanies = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/groupby-distinct/companies`);
      const dataCompanies = await resCompanies.json();
      companiesByAmount.current = dataCompanies;

      numberByCountry();
      profilesToTable();
      companiesByAmountProcessor();
    };
    callProfiles();
  }, []);

  return (
    <>
      <div style={{boxShadow: '0px 0px 20px 0px #c7c7c7', margin: "1rem auto", width: '70vw'}}>
        <h3 
          style={{padding: '0.5rem 0 0.6rem 0.5rem', margin: 0, cursor: 'pointer', color: '#666666', fontSize: '20px'}}
          onClick={() => {setMapCard((e) => !e)}}
        >Amount of profiles by country</h3>
        <Tooltip style={{display: mapCard ? 'block' : 'none'}} title={mapTooltip} followCursor>
          <div>
            <Map
              data={countries}
              colorScale={colorScale}
              width={'70vw'}
              height={500}
              Logic={ProfileAmount}
              setMapTooltip={setMapTooltip}
            />
          </div>
        </Tooltip>
      </div>

      <div style={{boxShadow: '0px 0px 20px 0px #c7c7c7', margin: "1rem auto", width: '70vw'}}>
        <h3 
          style={{padding: '0.5rem 0 0.6rem 0.5rem', margin: 0, cursor: 'pointer', color: '#666666', fontSize: '20px'}}
          onClick={() => {setTableCard((e) => !e)}}
        >Profile table</h3>
        <DataTable 
          rows={tableProfiles.current} 
          columns={tableColumns}
          style={{
            display: tableCard ? 'flex' : 'none' }}
        />
      </div>

      <div
        style={{
          width: "70vw",
          boxShadow: '0px 0px 20px 0px #c7c7c7',
          margin: "0 auto",
          backgroundColor: 'white'
        }}
      >
        <h3 
          style={{padding: '0.5rem 0 0.6rem 0.5rem', margin: 0, cursor: 'pointer', color: '#666666', fontSize: '20px'}}
          onClick={() => {setCompanyProfileCard((e) => !e)}}
        >Company by profile count</h3>
        <div style={{width: '50vw', height: '25vw', display: companyProfileCard ? 'block' : 'none', margin: '0 auto',
        padding: '1rem 0'}}>
          <PieChart
            labels={companiesByAmountLabels}
            data={companiesByAmountData}
            displayTitle={false}
            descriptionOfTooltip="Profiles"
            legendPosition="right"
            aspectRatio="2|1"
          />
        </div>
      </div>

      <div style={{height: '3rem'}}></div>
    </>
  );
}

export default App;
