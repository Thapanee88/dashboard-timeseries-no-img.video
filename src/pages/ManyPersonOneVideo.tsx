import ReactPlayer from 'react-player';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ChartItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import { IBio } from '../types/bio';
import { FindTime } from '../utils/find';
import { getRandomVibrantColor } from '../utils/random';
import { DropdownImg } from '../components/DropdownImg';
import { Dropdown } from '../components/Dropdown';
import InputFileMultiple from '../components/InputFileMultiple';
import Navbar from '../components/Navber';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  zoomPlugin
);

type Options = {
  label: string;
  value: string;
};


const ManyPersonOneVideo = () => {
  const notify = () => toast.success("Success Upload!")

  const [isRadiusZero, setIsRadiusZero] = useState(false);
  const toggleRadiusOption = () => {
    setIsRadiusZero((prevState) => !prevState);
  };

  const options = {
    radius: isRadiusZero ? 0 : undefined,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          // drag:{
          //   enabled:true
          // },
          mode: 'x',
          speed: 100
        },
        pan: {
          enabled: true,
          mode: 'x',
          speed: 0.5
        }
      },
    }
  };

  // dropdrows
  const optionList: Options[] = [
    { label: 'attention', value: 'attention' },
    { label: 'meditation', value: 'meditation' },
    { label: 'theta', value: 'theta' },
    { label: 'delta', value: 'delta' },
    { label: 'low_alpha', value: 'low_alpha' },
    { label: 'high_alpha', value: 'high_alpha' },
    { label: 'low_beta', value: 'low_beta' },
    { label: 'high_beta', value: 'high_beta' },
    { label: 'low_gamma', value: 'low_gamma' },
    { label: 'mid_gamma', value: 'mid_gamma' },
    { label: 'poor_signal', value: 'poor_signal' },
    { label: 'blink_strength', value: 'blink_strength' },
    { label: 'IBI', value: 'IBI' },
    { label: 'BPM', value: 'BPM' },
    { label: 'CVNN', value: 'CVNN' },
    { label: 'SDNN', value: 'SDNN' },
    { label: 'RMSSD', value: 'RMSSD' },
    { label: 'SDNN_over_RMSSD', value: 'SDNN_over_RMSSD' },
    { label: 'pNN10', value: 'pNN10' },
    { label: 'pNN20', value: 'pNN20' },
    { label: 'pNN30', value: 'pNN30' },
    { label: 'pNN40', value: 'pNN40' },
    { label: 'pNN50', value: 'pNN50' },
    { label: 'LF', value: 'LF' },
    { label: 'HF', value: 'HF' },
    { label: 'LF_over_HF', value: 'LF_over_HF' }
  ];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //input multiple file
  const [fileMultiple, setFileMultiple] = useState<File[]>([]);
  const [csvDataMap, setCsvDataMap] = useState<{ [fileName: string]: IBio[] }>({});

  const processCSV2 = (fileName: string, str: string, delim = ',') => {
    const rows = str.slice(str.indexOf('\n') + 1).split('\r');
    const data = rows.map((item: any, index) => {
      const values = item.split(delim);
      const row: IBio = {
        id: index,
        timestamp: String(values[0]),
        attention: Number(values[1]),
        meditation: Number(values[2]),
        theta: Number(values[3]),
        delta: Number(values[4]),
        low_alpha: Number(values[5]),
        high_alpha: Number(values[6]),
        low_beta: Number(values[7]),
        high_beta: Number(values[8]),
        low_gamma: Number(values[9]),
        mid_gamma: Number(values[10]),
        poor_signal: Number(values[11]),
        blink_strength: Number(values[12]),
        IBI: Number(values[13]),
        BPM: Number(values[14]),
        CVNN: Number(values[15]),
        SDNN: Number(values[16]),
        RMSSD: Number(values[17]),
        SDNN_over_RMSSD: Number(values[18]),
        pNN10: Number(values[19]),
        pNN20: Number(values[20]),
        pNN30: Number(values[21]),
        pNN40: Number(values[22]),
        pNN50: Number(values[23]),
        LF: Number(values[24]),
        HF: Number(values[25]),
        LF_over_HF: Number(values[26]),
        stimu_num: Number(values[27]),
        videoSec: Number(0)
      }
      return row
    })
    const updatedData = FindTime(data);

    // Update the map with the processed data
    setCsvDataMap((prevDataMap) => ({
      ...prevDataMap,
      [fileName]: updatedData,
    }));
  };

  const submit2 = () => {
    if (fileMultiple) {
      Array.from(fileMultiple).forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          const text = e.target?.result as string;
          processCSV2(file.name, text);
        };
        reader.readAsText(file);
        notify()
      });
    }
  };

  const dropdownOptionsVideo = [
    { value: 1, label: '01 パイ投げ', img: '../../img/01_パイ投げ.png' },
    { value: 2, label: '02 恐竜ダンス', img: '../../img/02_恐竜ダンス.png' },
    { value: 5, label: '05 スケートボード', img: '../../img/05_スケートボード.png' },
    { value: 6, label: '06 格闘技', img: '../../img/06_格闘技.png' },
    { value: 10, label: '10 火星', img: '../../img/10_火星.png' },
    { value: 12, label: '12 祖母誕生日', img: '../../img/12_祖母誕生日.png' },
    { value: 15, label: '15 ペロペロ犬', img: '../../img/15_ペロペロ犬.png' },
    { value: 16, label: '16 リラックス犬', img: '../../img/16_リラックス犬.png' },
    { value: 19, label: '19 森のせせらぎ１', img: '../../img/19_森のせせらぎ１.png' },
    { value: 20, label: '20 森のせせらぎ２', img: '../../img/20_森のせせらぎ２.png' }
  ];

  const [selectedIndex, setSelectedIndex] = useState<Options>();
  const [selectedVideo, setSelectedVideo] = useState<number | undefined>();

  const [chartData2, setChartData2] = useState<{
    labels: Date[];
    datasets: { label: string; data: number[]; fill: boolean; borderColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [convertedFilteredData, setConvertedFilteredData] = useState<{
    [fileName: string]: { id: number; convertedId: number }[];
  }>({});

  const handleButtonClick2 = () => {
    if (selectedIndex && selectedVideo) {
      // Filter the data for the selected stimu_num
      const filteredData = Object.entries(csvDataMap).reduce((acc, [fileName, fileData]) => {
        const filteredFileData = fileData.filter((item) => item.stimu_num === selectedVideo);
        acc[fileName] = filteredFileData;
        return acc;
      }, {} as { [fileName: string]: IBio[] });

      console.log(filteredData);

      // Convert filteredData and update the ID field while preserving the original ids
      const convertedData = Object.entries(filteredData).reduce((acc, [fileName, fileData]) => {
        const convertedFileData = fileData.map((item, index) => ({
          ...item,
          convertedId: index, // Update the ID field to start from 0 for each file
        }));
        acc[fileName] = convertedFileData;
        return acc;
      }, {} as { [fileName: string]: { id: number; convertedId: number }[] });

      console.log(convertedData);

      setConvertedFilteredData(convertedData); // Update the state with the converted data

      // Create datasets for each file
      const datasets: { label: string; data: (number | null)[]; fill: boolean; borderColor: string }[] = [];

      Object.entries(convertedData).forEach(([fileName, fileData], i) => {
        const data = fileData.map((item) => item[selectedIndex.value] ?? null);
        datasets.push({
          label: fileName,
          data: data,
          fill: false,
          borderColor: getRandomVibrantColor(),
        });
      });

      // Create the final chart dataset
      const chartData: {
        labels: number[];
        datasets: { label: string; data: (number | null)[]; fill: boolean; borderColor: string }[];
      } = {
        labels: Array.from({ length: convertedData[Object.keys(convertedData)[0]].length }, (_, i) => i),
        datasets: datasets,
      };

      setChartData2(chartData);
    }
  };

  const [id2, setId2] = useState<{ fileName: string; id: number; selectedIndex: number }[]>([]);// Make sure to set the initial state as null

  const onClick2 = (event: ChartEvent<Element>, elements: ChartItem[], chart: any) => {
    if (elements.length > 0) {
      const clickedDatasetIndex = elements[0].datasetIndex;
      const clickedIndex = elements[0].index;
      const clickedLabel = chart.data.labels[clickedIndex];

      // Find the clicked data for the clicked label (convertedId)
      const clickedData = Object.values(convertedFilteredData)[clickedDatasetIndex].find(
        (item) => item.convertedId === clickedLabel
      );

      if (clickedData) {
        console.log('Clicked label (convertedId):', clickedLabel);

        // Find all original IDs, corresponding file names, and selectedIndex for the clicked convertedId
        const originalIds: { fileName: string; id: number; selectedIndex: number | null }[] = [];
        Object.entries(convertedFilteredData).forEach(([fileName, fileData]) => {
          const originalId = fileData.find((item) => item.convertedId === clickedLabel)?.id;
          if (originalId !== undefined) {
            // Find the corresponding selectedIndex for the clicked label (convertedId)
            const selectedIndex = chartData2.datasets.find((dataset) => dataset.label === fileName)?.data[clickedLabel] ?? null;
            originalIds.push({ fileName, id: originalId, selectedIndex });
          }
        });

        console.log('Original IDs:', originalIds);
        setId2(originalIds);
        console.log('id2', id2);
        onClickToPlay2();
      }
    }
  };


  const playerRef1 = useRef<ReactPlayerRef | null>(null);
  const [videoUrl2, setVideoUrl2] = useState('');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [startTime1, setStartTime1] = useState(0);
  const [endTime1, setEndTime1] = useState(0);

  //play video
  const onClickToPlay2 = () => {
    if (selectedVideo === 1) { setVideoUrl2("../video/01_パイ投げ/パイ投げ.mp4") }
    else if (selectedVideo === 2) { setVideoUrl2("../video/02_恐竜ダンス/恐竜ダンス.mp4") }
    else if (selectedVideo === 5) { setVideoUrl2("../video/05_スケートボード/スケートボード.mp4") }
    else if (selectedVideo === 6) { setVideoUrl2("../video/06_格闘技/格闘技.mp4") }
    else if (selectedVideo === 10) { setVideoUrl2("../video/10_火星/火星.mp4") }
    else if (selectedVideo === 12) { setVideoUrl2("../video/12_祖母誕生日/祖母誕生日.mp4") }
    else if (selectedVideo === 15) { setVideoUrl2("../video/15_ペロペロ犬/ペロペロ犬.mp4") }
    else if (selectedVideo === 16) { setVideoUrl2("../video/16_リラックス犬/リラックス犬.mp4") }
    else if (selectedVideo === 19) { setVideoUrl2("../video/19_森のせせらぎ１/森のせせらぎ１.mp4") }
    else if (selectedVideo === 20) { setVideoUrl2("../video/20_森のせせらぎ２/森のせせらぎ２.mp4") }
    else { setVideoUrl2("") }

    if (id2[0]) {
      const selectedDataArray = csvDataMap[id2[0].fileName]; // Replace "fileName" with the actual file name associated with id2[0]
      console.log('Selected Data Array:', selectedDataArray);
      const selectedData = selectedDataArray.find((item) => item.id === id2[0].id);
      console.log('Selected Data:', selectedData);

      if (selectedData) {
        console.log('videoSec:', selectedData.videoSec);
        const endtime = selectedData.videoSec;
        const starttime = endtime - 1;
        console.log('Start Time:', starttime);
        console.log('End Time:', endtime);

        setIsPlaying1(true);
        setStartTime1(starttime);
        setEndTime1(endtime);
        playerRef1.current?.seekTo(starttime);
      }
    }
  };

  const onProgress2 = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds >= endTime1) {
      setIsPlaying1(false);
      console.log('endTime1:', endTime1);
    }
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      {/* test input */}
      <div>
        <div>
          <form id="csv-form" className='grid grid-cols-6 gap-3 m-2'>
            <div className='col-span-5'>
              <InputFileMultiple onChange={(value) => setFileMultiple(value)} acceptFile={['CSV']} />
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (fileMultiple.length > 0) submit2();
              }}
            >
              Upload
            </Button>
            <ToastContainer />
          </form>
        </div>

        <div className='grid grid-cols-6 gap-3'>
          <div className='col-span-4'>
            {/* ปุ่มปรับแต่ง */}
            <div className='grid grid-cols-4 gap-3'>
              <div>
                <Button onClick={toggleRadiusOption}>
                  Point : {isRadiusZero ? 'Disable' : 'Enable'}
                </Button>
              </div>
              <div>
                <DropdownImg options={dropdownOptionsVideo} onSelect={(selectedOption) => setSelectedVideo(selectedOption.value)} />
              </div>
              <div>
                <Dropdown options={optionList} onSelect={(value) => {
                  console.log("on selected", value);
                  setSelectedIndex(value);
                }} />
              </div>
              <div>
                <Button onClick={handleButtonClick2}>
                  Apply
                </Button>
              </div>
            </div>
          <div>
              {chartData2.labels.length > 0 && (
                <Line
                  options={{
                    ...options,
                    onClick: (event: ChartEvent, elements: ChartItem[], chart: any) => onClick2(event, elements, chart),
                    getElementAtEvent: (elements: ChartItem[], event: any) => elements,
                  }}
                  data={chartData2}
                />
              )}
            </div>
          </div>
          <div className='col-span-2'>
            <div>
              <ReactPlayer
                ref={playerRef1}
                url={videoUrl2}
                controls={true}
                playing={isPlaying1}
                width="auto"
                height=""
                onProgress={onProgress2}
              />
            </div>
            <div className='overflow-y-auto h-60 mt-3'>
            {selectedIndex ? 
              <table>
                <thead>
                  <tr>
                    <th className="px-4 py-2">Filename</th>
                    <th className="px-4 py-2">{selectedIndex ? selectedIndex.label : ''}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(id2).map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{data.fileName}</td>
                      <td className="border px-4 py-2">{data.selectedIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManyPersonOneVideo;

