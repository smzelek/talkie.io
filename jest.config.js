module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "~backend/(.*)": '<rootDir>/backend/src/$1',
    "~frontend/(.*)": '<rootDir>/frontend/src/$1',
    "~core(.*)": '<rootDir>/core$1',
    "~db(.*)": '<rootDir>/db$1'
  }
};