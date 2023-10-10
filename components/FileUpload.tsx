"use client";

import {AiOutlineFilePdf} from "react-icons/ai";
import { useState, useEffect } from "react";
import {FaRegFilePdf} from "react-icons/fa";
import styles from "@/styles/components/FileUpload.module.css";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {PiProjectorScreen} from "react-icons/pi";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const options : string[] = [
    "Concor", "Community Build", "Blue Moon Project", "IGUAL", "Jagger Library"
]

export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState<{url: string, file: any}>({
        url: "",
        file: null
    })
    const [title, setTitle] = useState<{text: string; error: string}>({
        text: "",
        error: ""
    })
    const [description, setDescription] = useState<{text: string; error: string}>({
        text: "",
        error: ""
    })
    const [showSelection, setShowSelection] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<string>("Select category")
    const router = useRouter();

    const cancelUpload = () => {
        setSelectedFile({url: "", file: null})
        setTitle({text: "", error: ""})
        setDescription({text: "", error: ""})
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                alert("You are not a valid user")
                router.push("/")
            }
        })
    }, [router])

    const uploadMedia = () => {
        if (selectedFile.url.trim().length === 0) {
            alert("Please select an file")
            return
        }
        if (selectedCategory === "Select category") {
            setShowSelection(true)
            return
        }
        if (title.text.trim().length === 0) {
            alert("Please enter file title")
            return
        }
        if (description.text.trim().length === 0) {
            alert("Please enter file description")
            return
        }

        const storageRef = ref(storage, `files/${selectedCategory}/uploadedFiles/${selectedFile.file?.name}`)

        uploadBytes(storageRef, selectedFile.file).then(() => {
            getDownloadURL(storageRef).then((url) => {
                const imageRef = collection(db, `data/${selectedCategory}/files`)

                const data = {
                    fileUrl: `${url}`,
                    fileTitle: title.text,
                    fileDescription: description.text
                }

                addDoc(imageRef, data).then(() => {
                    alert("File uploaded successfully")
                    setTitle({text: "", error: ""})
                    setDescription({text: "", error: ""})
                    setSelectedCategory("Select category")
                    setShowSelection(false)
                    setSelectedFile({url: "", file: null})
                }).catch((error) => {
                    alert("There was a problem uplaoding your file to database")
                    console.log("Error:", error)
                })

            }).catch(() => {
                alert("There was a problem downloading your file")
            }) 
        }).catch(() => {
            alert("There was a problem uplaoding your file")
        })
    }

    return (
        <section className={styles.fileUpload}>
            <h2 className={styles.fileUploadTitle}>Upload your pdf</h2>
            <p className={styles.fileUploadText}>You can upload one file at a time</p>
            <section className={styles.fileUploadSelect}>
                <label 
                    htmlFor="fileUpload"
                    className={styles.fileUploadSelected}
                >
                    <AiOutlineFilePdf className={styles.fileUploadSelectedIcon} />
                    <h3 className={styles.fileUploadSelectedTitle}>Click to upload file</h3>
                    <p className={styles.fileUploadSelectedText}>Only accepts pdf documents</p>
                </label>
                <input 
                    type="file"
                    accept=".pdf"
                    hidden
                    id="fileUpload"
                    onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            setSelectedFile({
                                url: URL.createObjectURL(event.target.files[0]),
                                file: event.target.files[0]
                            });
                        }
                    }}
                />
            </section>
            {(selectedFile.url.length === 0) ?
                <section className={styles.fileUploadInfo}>
                    <FaRegFilePdf className={styles.fileUploadInfoIcon} />
                    <div className={styles.fileUploadInfoContent}>
                        <h3 className={styles.fileUploadInfoContentTitle}>File data</h3>
                        <p className={styles.fileUploadInfoContentText}>No file chosen yet</p>
                    </div>
                </section> :
                <section className={styles.fileUploadInfo2}>
                    <FaRegFilePdf className={styles.fileUploadInfoIcon2} />
                    <div className={styles.fileUploadInfoContent}>
                        <h3 className={styles.fileUploadInfoContentTitle}>{selectedFile.file?.name}</h3>
                        <p className={styles.fileUploadInfoContentText}>Size: {selectedFile.file?.size}</p>
                    </div>
                </section>
            }
            <div className={styles.imageUploadMainSelection}>
                <div className={styles.selectionDisplay}>
                    <span className={styles.selectionDisplayText}>{selectedCategory}</span>
                    {showSelection ? <FiChevronUp 
                        onClick={() => setShowSelection(false)} 
                        className={styles.selectionDisplayIcon}
                    /> : <FiChevronDown 
                        onClick={() => setShowSelection(true)}
                        className={styles.selectionDisplayIcon}
                    />}
                </div>
                <div 
                    className={styles.selectionOptions}
                    style={{
                    display: showSelection ? "block" : "none"
                }}
                >
                    {options.map((item, id) => {
                        return (
                            <div 
                                key={id} 
                                className={(item === selectedCategory) ? styles.selectionOptionSelected : styles.selectionOption}
                                onClick={() => {
                                    setSelectedCategory(item)
                                    setShowSelection(false)
                                }}
                            >
                                <PiProjectorScreen />
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <section className={styles.fileUploadInput}>
                <input 
                    type="text"
                    placeholder="Enter file title..."
                    onChange={(e) => setTitle({...title, text: e.target.value})}
                    value={title.text}
                    className={styles.inputTitle}
                />
                <p>{title.error}</p>
                <textarea 
                    placeholder="Enter file description..."
                    onChange={(e) => setDescription({...description, text: e.target.value})}
                    value={description.text}
                    className={styles.inputArea}
                />
                <p>{description.error}</p>
            </section>
            <section className={styles.submitContainer}>
                <button className={styles.submitContainerCancel} onClick={cancelUpload}>Restart upload</button>
                <button className={styles.submitContainerButton} onClick={uploadMedia}>Upload file</button>
            </section>
        </section>
    )
}