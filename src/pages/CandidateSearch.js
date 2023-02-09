import { useEffect, useRef, useState } from "react";
import FilterButton from "../components/CandidateSearch/button/FilterButton";
import DataTable from "../components/DataTable";
import FilterCandidate from "./FilterCandidate";

function CandidateSearch() {
  const profiles = useRef([]);
  //const tableProfiles = useRef([]);
	const [tableProfiles, setTableProfiles] = useState([]);

  // toggles
  const [tableCard, setTableCard] = useState(true);
	const [filtering, setFiltering] = useState(false);

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

  function profilesToTable() {
    const tableProfilesAux = [];
    profiles.current.forEach((profile, id) => {
      tableProfilesAux.push({
        id,
        name: `${profile.firstName} ${profile.lastName}`,
        username: profile.username,
        location: profile.location?.locationName || "",
      });
    });
    console.log(tableProfilesAux);
		setTableProfiles(tableProfilesAux);
  }

  useEffect(() => {
    const callProfiles = async () => {
      const resProfiles = await fetch(process.env.REACT_APP_LINKEDIN_API_LINK);
      const dataProfiles = await resProfiles.json();
      profiles.current = dataProfiles;

      profilesToTable();
    };
    callProfiles();
  }, []);

  return (
    <>
			<FilterCandidate style={{display: filtering ? 'block' : 'none'}} setFiltering={setFiltering}/>

			<div style={{filter: filtering ? 'blur(1px)' : 'none', pointerEvents: filtering ? 'none' : 'all'}}>
				<FilterButton onClick={() => {setFiltering(!filtering)}}>Filtrar perfil</FilterButton>
				<DataTable
					rows={tableProfiles}
					columns={tableColumns}
					pageSize={10}
					style={{
						display: tableCard ? "flex" : "none",
						height: '90vh'
					}}
				/>
			</div>
    </>
  );
}

export default CandidateSearch;
