import { Fragment } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

const Mydocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
    },
    section: {
      margin: 10,
      padding: 5,
      flexGrow: 3,
    },
  });
  return (
    <Fragment>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </Fragment>
  );
};

export default Mydocument;
