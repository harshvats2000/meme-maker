import React from 'react';

const AuthenticationContext = React.createContext()
const PhotoURLContext = React.createContext()
const DisplayNameContext = React.createContext()

const AuthenticationProvider = AuthenticationContext.Provider;
const AuthenticationConsumer = AuthenticationContext.Consumer;

const PhotoURLProvider = PhotoURLContext.Provider;
const PhotoURLConsumer = PhotoURLContext.Consumer;
const DisplayNameProvider = DisplayNameContext.Provider;
const DisplayNameConsumer = DisplayNameContext.Consumer;

export { AuthenticationProvider, AuthenticationConsumer, PhotoURLProvider, PhotoURLConsumer, DisplayNameProvider, DisplayNameConsumer }