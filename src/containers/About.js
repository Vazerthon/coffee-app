import AboutFeature from '../components/features/About';
import useImportExport from '../hooks/useImportExport';
import Wrapper from './Wrapper';

export default function About() {
  const { importData, generateExportData } = useImportExport();

  return (
    <Wrapper title="About">
      <AboutFeature backupData={generateExportData()} onImportBackupFile={importData} />
    </Wrapper>
  );
}
