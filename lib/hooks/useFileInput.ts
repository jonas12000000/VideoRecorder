import { ChangeEvent, useRef, useState } from "react"

export const useFileInput = (maxSize: number) => {
    const [file, setFile] = useState<File | null >(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [duration, setDuration] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]){
            const selectedFile = e.target.files[0];

            if(selectedFile.size > maxSize) return;

            if(previewUrl) URL.revokeObjectURL(previewUrl);

            setFile(selectedFile);

            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);

            if(selectedFile.type.startsWith('video')){
                const tempVideo = document.createElement('video');
                tempVideo.preload = 'metadata';
                //tempVideo.src = objectUrl;
                tempVideo.onloadedmetadata = () => {
                    if(isFinite(tempVideo.duration) && tempVideo.duration > 0){
                        setDuration(Math.round(tempVideo.duration));
                    } else {
                        setDuration(0);
                    }
                    URL.revokeObjectURL(tempVideo.src);
                }
                tempVideo.src = objectUrl;
            }
        }
    }

    const resetFile = () => {
        if(previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl('');
        setDuration(0);
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    return {
        file,
        previewUrl,
        duration,
        inputRef,
        handleFileChange,
        resetFile
    };
}