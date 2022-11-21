import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem isCurrentPage>
        <Link to="/">Home</Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Link to="/about">About</Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Link to="/contact">Contact</Link>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default Navbar;
