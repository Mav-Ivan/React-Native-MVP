import { useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'

import { HeaderWithBackArrow } from '~/components'
import { PaperText } from '~/containers'
import { stepContent } from '~/constants/stepper'

import palette from '~/styles/app-theme/app.pallete'
import { styles } from './Stepper.styles'

const Stepper = () => {
  const [step, setStep] = useState(1)
  const [back, setBack] = useState(false)
  const progress = step * 0.25
  const headerText = `Step ${step} of 4`

  const onNext = () => {
    step != 4 && setStep((prev) => prev + 1)
    setBack(true)
  }

  const onArrowPress = () => {
    setStep((prev) => prev - 1)
    step == 2 && setBack(false)
  }

  const content = stepContent[step]

  const showButtons = (step == 4 && (
    <Button
      contentStyle={styles.buttonContent}
      mode='contained'
      style={styles.button}
    >
      Finish
    </Button>
  )) || (
    <>
      <Button
        contentStyle={styles.buttonContent}
        icon={() => <AntDesign color='#fff' name='arrowright' size={20} />}
        mode='contained'
        onPress={onNext}
        style={styles.button}
      >
        Next
      </Button>
      <Button onPress={onNext}>
        <PaperText bold>Skip</PaperText>
      </Button>
    </>
  )

  return (
    <View style={styles.root}>
      <HeaderWithBackArrow
        onPress={back && onArrowPress}
        route={'/'}
        text={headerText}
      />
      <ProgressBar
        color={palette.surfaceVariant}
        progress={progress}
        style={styles.progressBar}
      />
      <View style={styles.mainContent}>
        {content}
        <View style={styles.buttonContainer}>{showButtons}</View>
      </View>
    </View>
  )
}

export default Stepper