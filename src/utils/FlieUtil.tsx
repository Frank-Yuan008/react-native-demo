import RNFS from 'react-native-fs';

// new and write file
export const writeFile = (filePath: string, content: string) => {
    return RNFS.writeFile(filePath, content, 'utf8');
};

//append content
export const appendToFile = (filePath: string, content: string) => {
    return RNFS.appendFile(filePath, content, 'utf8');
}

//download file
export const downloadFile = (url: string, dstPath: string) => {
    const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: dstPath,
    });
    return download.promise
}

// read file
export const readFile = (filePath: string) => {
    return RNFS.readFile(filePath, 'utf8');
};

// delete file
export const deleteFile = (filePath: string) => {
    RNFS.exists(filePath)
        .then((exists) => {
            if (exists) {
                RNFS.unlink(filePath);
            }
        });
};