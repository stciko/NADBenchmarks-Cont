import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import '../css/general.css'

const Navbar = () => {
  let location = useLocation();

  return (
    <Breadcrumb separator="">
      <BreadcrumbItem isCurrentPage>
        {location.pathname === '/' ? (
          <Link to="/">
            <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
              Home
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
              Home
            </Button>
          </Link>
        )}
      </BreadcrumbItem>

      <BreadcrumbItem>
        {location.pathname === '/about' ? (
          <Link to="/about">
            <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
              About
            </Button>
          </Link>
        ) : (
          <Link to="/about">
            <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
              About
            </Button>
          </Link>
        )}
      </BreadcrumbItem>

      <BreadcrumbItem>
        {location.pathname === '/submitDataset' ? (
          <Link to="/submitDataset">
            <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
              Submit Dataset
            </Button>
          </Link>
        ) : (
          <Link to="/submitDataset">
            <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
              Submit Dataset
            </Button>
          </Link>
        )}
      </BreadcrumbItem>

      <BreadcrumbItem>
        {location.pathname === '/contact' ? (
          <Link to="/contact">
            <Button borderRadius="10px" bg="#7AAC35" _hover={{ bg: '#7AAC35' }}>
              Contact
            </Button>
          </Link>
        ) : (
          <Link to="/contact">
            <Button borderRadius="10px" bg="#FFFFFF" _hover={{ bg: '#7AAC35' }}>
              Contact
            </Button>
          </Link>
        )}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Navbar;
