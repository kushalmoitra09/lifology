import React from 'react'
import styles from '../styles/Step.module.css'

const Step = ({ index }) => {
    return (
        <nav className={styles.formSteps}>
            <div className={
                index == 1 ?
                    `${styles.stepItem} ${styles.stepItemActive}` :
                    `${styles.stepItem} ${styles.stepItemCompleted}`
            }>
                <div className={styles.stepContent}>
                    <span className={styles.stepNumber}>01</span>
                    <span className={styles.stepTitle}>Parent's Detail</span>
                </div>

            </div>
            <div className={
                index == 1 ? `${styles.stepItem}` :
                    index == 2 ? `${styles.stepItem} ${styles.stepItemActive}` :
                        `${styles.stepItem} ${styles.stepItemCompleted}`}>
                <div className={styles.stepContent}>
                    <span className={styles.stepNumber}>02</span>
                    <span className={styles.stepLine}></span>
                    <span className={styles.stepTitle}>Child Detail</span>
                </div>
            </div>
            <div className={
                index == 1 || index == 2 ?
                    `${styles.stepItem}` :
                    `${styles.stepItem} ${styles.stepItemActive}`
            }>
                <div className={styles.stepContent}>
                    <span className={styles.stepNumber}>03</span>
                    <span className={styles.stepLine}></span>
                    <span className={styles.stepTitle}>Choose Grade</span>
                </div>
            </div>
        </nav >
    )
}

export default Step