const fs = jest.createMockFromModule('fs');

fs.existsSync = jest.fn();
fs.writeFileSync = jest.fn();

module.exports = fs;