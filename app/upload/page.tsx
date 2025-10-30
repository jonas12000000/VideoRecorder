'use client'
import { ChangeEvent, FormEvent, useState } from "react"
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { useFileInput } from "@/lib/hooks/useFileInput"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants"
import { set } from "better-auth"


const Page = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: ''
  })
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData((prevState) => ({...prevState, [name]: value}))
  }

  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload video and a thumbnail file.");
        return;
      }
      if (!formData.title || !formData.description) {
        setError("Please fill in all required fields.");
        return;
      }
      /* const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("visibility", formData.visibility);
      uploadData.append("video", video.file);
      if (thumbnail.file) {
        uploadData.append("thumbnail", thumbnail.file);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      // Reset form or show success message as needed
      setFormData({ title: '', description: '', visibility: '' });
      video.resetFile();
      thumbnail.resetFile();
      alert('Video uploaded successfully!'); */
    } catch (err:any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  } 

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="Title"
          placeholder="Please write down a descriptive and concise video title"
          value={formData.title}
          onChange={inputChangeHandler}
        />
        <FormField
          id="description"
          label="Description"
          placeholder="Write a description for the video"
          value={formData.description}
          as="textarea"
          onChange={inputChangeHandler}
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />
        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="image"
        />
        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
          onChange={inputChangeHandler}
        />
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
}

export default Page