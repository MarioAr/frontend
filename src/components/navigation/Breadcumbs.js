import React, { Component } from 'react';
import classname from 'classname';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router'

import Routes from 'modules/app/routes';
import isEmpty from 'lodash/isEmpty';


class Breadcumbs extends Component {
  mountBreadcumb() {
    const breadcumbs = [];
    let data = window.location.pathname;
    let getRoute = item => {
      const info = {
        exact: true,
        path: '/tiendanube' + item.path
      };
      return matchPath(data, info);
    }
    while(data !== '') {
      
      const route = Routes.find(getRoute);
      if(!isEmpty(route)) {
        let comp;
        if (data !== window.location.pathname) {
          comp = <li key={route.path}><Link to={route.path}> {route.title} </Link></li>;
        } else {
          comp = <li key={route.path}> {route.title} </li>;          
        }
        breadcumbs.push(comp);
      }

      data = data.substring(0, data.lastIndexOf("/"));                    
    }

    return breadcumbs.reverse();
  }

  render() {
    const breadcumbs = this.mountBreadcumb();
    const { className } = this.props;
    const classComponent = classname('breadcumbs', className);
    return (
      <ul className={classComponent}>
        {breadcumbs}
      </ul>
    )
  }
};

export default Breadcumbs;