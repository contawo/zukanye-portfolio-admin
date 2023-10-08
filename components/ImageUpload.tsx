"use client";

import { useState } from "react";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {PiProjectorScreen} from "react-icons/pi";
import {BsCloudUpload} from "react-icons/bs";
import styles from "@/styles/components/ImageUpload.module.css";
import {CiImageOff} from "react-icons/ci";
import {FiImage} from "react-icons/fi";


const options : string[] = [
    "Concor", "Community Build", "Blue Moon Project", "IGUAL"
]

export default function ImageUpload() {
    const [selectedCategory, setSelectedCategory] = useState("Select category")
    const [showSelection, setShowSelection] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<{url: string, file: any}>({
        url: "",
        file: null
    })
    const [inputFields, setInputFields] = useState<{title: string, text: string}>( {
        title: "",
        text: ""
    })

    const cancelUpload = () => {
        setInputFields({title: "", text: ""})
        setSelectedCategory("Select category")
        setShowSelection(false)
        setSelectedImage({url: "", file: null})
    }

    return (
        <section className={styles.imageUpload}>
            <section className={styles.imageUploadContent}>
                {(selectedImage.url.length === 0) ? 
                    <label 
                        htmlFor="uploadImage"
                        className={styles.imageUploadContentLabel}
                    >
                        <BsCloudUpload className={styles.imageUploadContentLabelIcon} />
                        <span className={styles.imageUploadContentLabelText}>Upload Image</span>
                    </label>: 
                    <div
                        className={styles.imageUploadContentDisplay}
                        style={{
                            backgroundImage: `url("${selectedImage.url}")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}
                    ></div>
                }
                <input 
                    type="file"
                    accept="image/png, image/jpeg"
                    id="uploadImage"
                    hidden
                    onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                            setSelectedImage({
                                url: URL.createObjectURL(event.target.files[0]),
                                file: event.target.files[0]
                            });
                        }
                    }}
                />
            </section>
            <section className={styles.imageUploadMain}>
                {(selectedImage.url.length === 0) ?
                    <div className={styles.imageUploadMainInfo}>
                        <CiImageOff className={styles.imageUploadMainInfoIcon} />
                        <div className={styles.imageUploadMainInfoContent}>
                            <h3 className={styles.imageUploadMainInfoContentTitle}>Image data</h3>
                            <p className={styles.imageUploadMainInfoContentText}>No image selected</p>
                        </div>
                    </div> :
                    <div className={styles.imageUploadMainSelect}>
                        <FiImage className={styles.imageUploadMainSelectIcon} />
                        <div className={styles.imageUploadMainSelectContent}>
                            <h3 className={styles.imageUploadMainSelectContentTitle}>{selectedImage.file?.name}</h3>
                            <p className={styles.imageUploadMainSelectContentText}>Size: {selectedImage.file?.size}</p>
                        </div>
                    </div>
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
                <input 
                    type="text" 
                    placeholder="Enter image title..."
                    onChange={(e) => setInputFields({...inputFields, title: e.target.value})}
                    value={inputFields.title}
                    className={styles.inputTitle}
                />
                <textarea 
                    placeholder="Enter image description..."
                    onChange={(e) => setInputFields({...inputFields, text: e.target.value})}
                    value={inputFields.text}
                    className={styles.inputArea}
                />
                <div className={styles.submitContainer}>
                    <button className={styles.submitContainerCancel} onClick={cancelUpload}>Restart upload</button>
                    <button className={styles.submitContainerButton}>Upload Image</button>
                </div>
            </section>
        </section>
    )
}