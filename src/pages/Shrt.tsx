import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { Button, Blue, Flex, Input, InputProps, Para } from './../component/Shrtx.style';

const Shrt: React.FC<InputProps> = () => {
  const [short, setShort] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
      setShort(res.data.result.full_short_link);
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
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClick = () => {
    setInputValue(value);
    setValue('');
  };

  return (
    <Blue>
      <h1>
        URL <span style={{ color: '#FF943C' }}>Shortner</span>
      </h1>
      <Flex>
        <Input placeholder="place a link to shorten" value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleClick}>Shorten</Button>
      </Flex>
      {loading ? (
        <p>loading</p>
      ) : (
        short && (
          <Flex>
            <Para>{short}</Para>
            <CopyToClipboard text={short} onCopy={() => setCopied(true)}>
              <Button>{copied ? 'Copied!' : 'Copy to clipboard'}</Button>
            </CopyToClipboard>
          </Flex>
        )
      )}
      {error && <p>Something went wrong</p>}
    </Blue>
  );
};

export default Shrt;
