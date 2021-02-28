import {statements} from "../data/stress-type.interface";

export enum LocalStorageKey {
  STATEMENTS = 'statements',
  CURRENT_STATEMENT = 'currentStatement',
}

export const readFromLocalStorage = (key: LocalStorageKey) => JSON.parse(localStorage.getItem(key));

export const storeInLocalStorage = (key: LocalStorageKey, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const resetLocalStorage = () => localStorage.clear();

export const getOrCreateRandomlyOrderedStatements = () => {
  let storedStatements = readFromLocalStorage(LocalStorageKey.STATEMENTS);

  if (!storedStatements) {

    storedStatements = statements
      .map(statement => Object.assign({}, statement, {orderKey: Math.random()}))
      .sort((a, b) => b.orderKey - a.orderKey);

    storeInLocalStorage(LocalStorageKey.STATEMENTS, storedStatements);
  }

  return storedStatements;
}

export const getCurrentStatementIndex = () => {
  let storedCurrentStatement = readFromLocalStorage(LocalStorageKey.CURRENT_STATEMENT);

  if (!storedCurrentStatement && storedCurrentStatement !== 0) {
    storedCurrentStatement = 0;
    storeInLocalStorage(LocalStorageKey.CURRENT_STATEMENT, storedCurrentStatement);
  }

  return storedCurrentStatement;
}
