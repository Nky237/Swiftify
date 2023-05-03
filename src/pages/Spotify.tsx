import { useEffect, useState, FormEventHandler } from "react";
import { Flex } from "../component/Shrtx.style";
import axios from "axios";

interface Artist {
  id: string;
  images: { url: string }[];
  name: string;
}

interface Props {
  artists: Artist[];
}

const Spotify: React.FC = () => {
  const CLIENT_ID = "e9a4e87c654042cd825ede16e0059b43";
  const REDIRECT_URI = "http://localhost:5173/spot";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);

  const logOut = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  useEffect(() => {
    const hash = window.location.hash;
    const storedToken = window.localStorage.getItem("token") ?? null;

    if (!storedToken && hash) {
      const tokenFromHash = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];

      if (tokenFromHash) {
        window.location.hash = "";
        window.localStorage.setItem("token", tokenFromHash);
        setToken(tokenFromHash);
      }
    } else {
      setToken(storedToken);
    }
  }, []);

  const renderArtists = ({ artists }: Props) => {
    return artists.map((artist) => (
      <Flex key={artist.id}>
        {
        artist.images.length ? (
            <img width={"30%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )
        }
        {artist.name}
      </Flex>
    ));
  };

  return (
    <div>
      <h1>My Spotify Application</h1>

      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logOut}>Log Out</button>
      )}

      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}

      {renderArtists({ artists })}
    </div>
  );
};

export default Spotify;
