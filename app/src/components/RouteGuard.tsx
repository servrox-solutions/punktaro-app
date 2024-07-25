import React from 'react';
import './CenterContainer.css';
import { Redirect } from 'react-router';

export interface RouteGuardProps {
  children: React.ReactNode;
  when: boolean;
  redirect: string;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ when, redirect, children }: RouteGuardProps) => (
  <>
    when ? <Redirect to={redirect} /> : {children};
  </>
);

export default RouteGuard;
