import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { Button, Blue, Flex, Input, Table, InputProps, Para, Container } from './../component/Shrtx.style';

interface ShortUrl {
  originalUrl: string;
  shortenedUrl: string;
}

const Shrt: React.FC<InputProps> = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null | boolean>(null);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
 
  function handleCopy(index: number) {
    setCopiedIndex(index);
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setShortUrls(prevState => [...prevState, { originalUrl: inputValue, shortenedUrl: res.data.result.full_short_link }]);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedIndex(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [copiedIndex]);
  
  const handleClick = () => {
    setInputValue(value);
    setValue('');
  };
  
  const handleDelete = (index: number) => {
    const updatedUrls = [...shortUrls];
    updatedUrls.splice(index, 1);
    setShortUrls(updatedUrls);
    // Clear copiedIndex when deleting the copied URL
    if (copiedIndex === index) {
      setCopiedIndex(null);
    }
  }

  return (
    <Container>
      <h1>Easy URL Shortner</h1>
      <Blue>
        <h3>Simplify your url</h3>
        <Flex>
          <Input placeholder="place a link to shorten" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button onClick={handleClick}>Shorten</Button>
        </Flex>
        <p>All the shorted URL and their analysis aee public</p>
      </Blue>
      <Container>
        <h3>RECENT URLS</h3>
        {shortUrls.length > 0 && (
        <Table>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th colSpan={2}></th>
            <th>Date Generated</th>
          </tr>
          {loading ? (
            <p>loading</p>
          ) : (
            shortUrls.map((shortUrl, index) => (
              <tr key={index} style={{gap: '70px'}}>
                <Para style={{width: '15%'}}>{shortUrl.originalUrl}</Para>
                <Para>{shortUrl.shortenedUrl}</Para>
                <CopyToClipboard text={shortUrl.shortenedUrl} onCopy={() => handleCopy(index)}>
                  <Para>{copiedIndex === index ? 'Copied' : 'Copy'}</Para>
                </CopyToClipboard>
                <Para onClick={() => handleDelete(index)}>Delete</Para>
            <Para>{date}</Para>
          </tr>
        ))
      )}
      </Table>
        )}
      </Container>
      {error && <p>Something went wrong</p>}
      </Container>
  );
};

export default Shrt;
