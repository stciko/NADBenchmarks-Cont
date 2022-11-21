import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <Breadcrumb separator="">
      <BreadcrumbItem isCurrentPage>
        {location.pathname === '/' ? (
          <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
            <Link to="/">Home</Link>
          </Button>
        ) : (
          <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
            <Link to="/">Home</Link>
          </Button>
        )}
      </BreadcrumbItem>

      <BreadcrumbItem>
        {location.pathname === '/about' ? (
          <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
            <Link to="/about">About</Link>
          </Button>
        ) : (
          <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
            <Link to="/about">About</Link>
          </Button>
        )}
      </BreadcrumbItem>

      <BreadcrumbItem>
        {location.pathname === '/contact' ? (
          <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
            <Link to="/contact">Contact</Link>
          </Button>
        ) : (
          <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
            <Link to="/contact">Contact</Link>
          </Button>
        )}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Navbar;
