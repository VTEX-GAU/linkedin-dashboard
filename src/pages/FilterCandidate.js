import Input from "../components/CandidateSearch/input/index";
import FilterDiv from '../components/CandidateSearch/filterpage/FilterDiv';
import InputSelect from "../components/CandidateSearch/input/InputSelect";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

function FilterCandidate({setFiltering, ...props}) {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [monthsxp, setMonthsxp] = useState(0);
    const [company, setCompany] = useState('');
    const [language, setLanguage] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [course, setCourse] = useState('');
    const [degree, setDegree] = useState('');

    const [companies, setCompanies] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [proficiencies, setProficiencies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            const resCompanies = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/companies`);
            const dataCompanies = await resCompanies.json();
            setCompanies(dataCompanies);
        }
        const getAllLanguages = async () => {
            const resLanguages = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/languages`);
            const dataLanguages = await resLanguages.json();
            setLanguages(dataLanguages);
        }
        const getAllProficiencies = async () => {
            const resProficiencies = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/proficiencies`);
            const dataProficiencies = await resProficiencies.json();
            setProficiencies(dataProficiencies);
        }
        const getAllCountries = async () => {
            const resCountries = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/countries`);
            const dataCountries = await resCountries.json();
            setCountries(dataCountries);
        }
        const getAllCities = async () => {
            const resCities = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/cities`);
            const dataCities = await resCities.json();
            setCities(dataCities);
        }
        const getAllCourses = async () => {
            const resCourses = await fetch(`${process.env.REACT_APP_LINKEDIN_API_LINK}/courses`);
            const dataCourses = await resCourses.json();
            setCourses(dataCourses);
        }

        getAllCompanies();
        getAllLanguages();
        getAllProficiencies();
        getAllCountries();
        getAllCities();
        getAllCourses();
    }, []);

    return (
        <FilterDiv {...props}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2 style={{margin: 0, marginBottom: '1rem'}}>Filtrar perfil</h2>
                <CloseIcon style={{cursor: 'pointer'}} onClick={() => {setFiltering(false)}} />
            </div>

            {/* FILTERS */}
            <label for="username">Username</label>
            <Input id='username' value={username} onChange={(event) => {setUsername(event.target.value)}} />

            <label for="fullname">Full name</label>
            <Input id='fullname' value={fullname} onChange={(event) => {setFullname(event.target.value)}} />

            <label for="monthsexp">Months of experience</label>
            <Input id='monthsexp' type="number" value={monthsxp} onChange={(event) => {
                if(event.target.value < 0) {
                    setMonthsxp(0)
                } else {
                    setMonthsxp(event.target.value)
                }
            }} />

            <label for="company">Company</label>
            <InputSelect id='company' value={company} onChange={(event) => {setCompany(event.target.value)}}>
                {companies.map((company) => {
                    return <option value={company}>{company}</option>
                })}
            </InputSelect>

            <label for="language">Language</label>
            <InputSelect id='language' value={language} onChange={(event) => {setLanguage(event.target.value)}}>
                {languages.map((language) => {
                    return <option value={language}>{language}</option>
                })}
            </InputSelect>

            <label for="proficiency">Language proficiency</label>
            <InputSelect id='proficiency' value={proficiency} onChange={(event) => {setProficiency(event.target.value)}}>
                {proficiencies.map((proficiency) => {
                    return <option value={proficiency}>{proficiency}</option>
                })}
            </InputSelect>

            <label for="country">Country</label>
            <InputSelect id='country' value={country} onChange={(event) => {setCountry(event.target.value)}}>
                {countries.map((country) => {
                    return <option value={country}>{country}</option>
                })}
            </InputSelect>

            <label for="city">City</label>
            <InputSelect id='city' value={city} onChange={(event) => {setCity(event.target.value)}}>
                {cities.map((city) => {
                    return <option value={city}>{city}</option>
                })}
            </InputSelect>

            <label for="course">Course</label>
            <InputSelect id='course' value={course} onChange={(event) => {setCourse(event.target.value)}}>
                {courses.map((course) => {
                    return <option value={course}>{course}</option>
                })}
            </InputSelect>

            <label for="degree">Degree</label>
            <Input id='degree' value={degree} onChange={(event) => {setDegree(event.target.value)}} />

        </FilterDiv>
    )
}

export default FilterCandidate;