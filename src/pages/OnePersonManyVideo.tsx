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
import Multiselect from 'multiselect-react-dropdown';
import Button from '../components/Button';
import InputFile from '../components/InputFile';
import React from 'react';
import { IBio } from '../types/bio';
import { FindImageUrl, FindTime } from '../utils/find';
import { getRandomVibrantColor } from '../utils/random';
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


const OnePersonManyVideo = () => {
  //file
  const [file, setFile] = useState<File>();
  const [csvArray, setCsvArray] = useState<IBio[]>([]);

  const processCSV = (str: string, delim = ',') => {
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
    setCsvArray(updatedData)
  }

  const notify = () => toast.success("Success Upload!")

  const submit = () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target?.result as string;
        // console.log(text);
        processCSV(text);
      };
      reader.readAsText(file);
      notify()
    }
  };

  const getAnnotation = () => {
    const result = csvArray.reduce((buffer: any, item: any, index) => {
      if (item.stimu_num > 0) {
        if (buffer[`box${item.stimu_num}`]) {
          // If the box annotation exists, update its xMax
          buffer[`box${item.stimu_num}`].xMax += 1;
        } else {
          // If the box annotation doesn't exist, create a new one
          buffer[`box${item.stimu_num}`] = {
            type: 'box',
            xMin: index,
            xMax: index,
            yMin: 0,
            yMax: '100%',
            backgroundColor: 'rgba(191, 189, 189, 0.50)',
            borderWidth: 0,
            drawTime: 'beforeDraw'
          };
        }

        // Create a line annotation for each stimu_num
        buffer[`line${item.stimu_num}`] = {
          type: 'line',
          borderColor: 'rgb(90, 90, 90)46)',
          borderWidth: 1,
          scaleID: 'x',
          borderDash: ([5, 5]),
          value: buffer[`box${item.stimu_num}`].xMin,
          label: {
            display: true,
            content: () => {
              const img = new Image();
              img.src = FindImageUrl(item.stimu_num);
              return img;
            },
            backgroundColor: 'white',
            borderWidth: 1,
            width: '5%',
            height: '5%',
            position: 'start'
          }
        };
      }
      return buffer;
    }, {});

    console.log('result', result);
    return result;
  };

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
      annotation: {
        annotations: getAnnotation()
      },
    }
  };

  // dropdrows
  const [selected, setSelected] = useState<Options[]>([]);
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

  const [chartData, setChartData] = useState<{
    labels: Date[];
    datasets: { label: string; data: number[]; fill: boolean; borderColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  //update chart
  const handleButtonApply = () => {
    const selectedValues = selected.map((item) => item.value);

    const updatedChartData = {
      labels: csvArray.map((item) => item.id),
      datasets: selectedValues.map((selectedValuesParam) => ({
        label: selectedValuesParam,
        data: csvArray.map((item) => item[selectedValuesParam]),
        fill: false,
        borderColor: getRandomVibrantColor(),
        // tension: 0.4
      })),
    };
    setChartData(updatedChartData);
  };

  const [videoUrl, setVideoUrl] = useState('');
  const [status, setStatus] = useState('');
  // const [isPlaying, setIsPlaying] = useState(false);

  //onclick chart
  const [id, setId] = useState();
  const onClickPoint = (event: ChartEvent<Element>, elements: ChartItem[], chart: any) => {
    if (elements.length > 0) {
      const clickedDatasetIndex = elements[0].datasetIndex;
      const clickedIndex = elements[0].index;
      const clickedLabel = chart.data.labels[clickedIndex];
      console.log('Clicked label:', clickedLabel);
      setId(clickedLabel)
      playVideo()
    }
  };

  const playerRef = useRef<ReactPlayerRef | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  //play video
  const playVideo = () => {
    if (id) {
      const selectedData = csvArray.find((item) => item.id === id);
      console.log('Selected Data:', selectedData);
      if (selectedData) {
        console.log('stimu_num:', selectedData.stimu_num);
        console.log('videoSec:', selectedData.videoSec);
        const endtime = selectedData.videoSec;
        const starttime = endTime - 1;
        console.log('Start Time:', starttime);
        console.log('End Time:', endtime);
        if (selectedData.stimu_num < 0) {
          setVideoUrl('')
          if (selectedData.stimu_num === -99) {
            setStatus('DEFAULT')
          }
          else if (selectedData.stimu_num === -1) {
            setStatus('FIRST REST')
          }
          else if (selectedData.stimu_num === -2) {
            setStatus('PRE REST')
          }
          else if (selectedData.stimu_num === -4) {
            setStatus('REST CROSS')
          }
          else if (selectedData.stimu_num === -3) {
            setStatus('POST REST')
          }
          else if (selectedData.stimu_num === -5) {
            setStatus('SAM')
          }
          else if (selectedData.stimu_num === -6) {
            setStatus('QUESTIONNAIRE')
          }
          else if (selectedData.stimu_num === -7) {
            setStatus('ADDITIONAL QUESTIONNAIRE')
          }
        } else {
          if (selectedData.stimu_num === 1) {
            setVideoUrl("../video/01_パイ投げ/パイ投げ.mp4")
          }
          else if (selectedData.stimu_num === 2) {
            setVideoUrl("../video/02_恐竜ダンス/恐竜ダンス.mp4")
          }
          else if (selectedData.stimu_num === 5) {
            setVideoUrl("../video/05_スケートボード/スケートボード.mp4")
          }
          else if (selectedData.stimu_num === 6) {
            setVideoUrl("../video/06_格闘技/格闘技.mp4")
          }
          else if (selectedData.stimu_num === 10) {
            setVideoUrl("../video/10_火星/火星.mp4")
          }
          else if (selectedData.stimu_num === 12) {
            setVideoUrl("../video/12_祖母誕生日/祖母誕生日.mp4")
          }
          else if (selectedData.stimu_num === 15) {
            setVideoUrl("../video/15_ペロペロ犬/ペロペロ犬.mp4")
          }
          else if (selectedData.stimu_num === 16) {
            setVideoUrl("../video/16_リラックス犬/リラックス犬.mp4")
          }
          else if (selectedData.stimu_num === 19) {
            setVideoUrl("../video/19_森のせせらぎ１/森のせせらぎ１.mp4")
          }
          else if (selectedData.stimu_num === 20) {
            setVideoUrl("../video/20_森のせせらぎ２/森のせせらぎ２.mp4")
          }
        }
        setIsPlaying(true);
        setStartTime(starttime)
        setEndTime(endtime);
        playerRef.current?.seekTo(starttime);
      }
    }
  }

  const stopVideo = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds >= endTime) {
      setIsPlaying(false);
      console.log('endTime:', endTime)
    }
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      {/* input */}
      <div>
        <form id="csv-form" className='grid grid-cols-6 gap-3 m-2'>
          <div className='col-span-5'>
            <InputFile onChange={(value) => setFile(value)} acceptFile={['CSV']} />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (file) submit();
            }}>
            Upload
          </Button>
          <ToastContainer />
        </form>
      </div>
      <div className='grid grid-cols-6 gap-3'>
        <div className='col-span-4'>
          <div className='grid grid-cols-4 gap-2'>
            <div>
              {/* button for on/off piont */}
              <Button onClick={toggleRadiusOption}>
                Point : {isRadiusZero ? 'Disable' : 'Enable'}
              </Button>
            </div>
            {/* dropdown index */}
            <div className='col-span-2'>
              <Multiselect
                options={optionList}
                displayValue="label"
                onSelect={(value) => {
                  console.log("on selected", value);
                  setSelected(value);
                }}
                onRemove={(value) => {
                  console.log("on Remove", value);
                  setSelected(value);
                }}
              />
            </div>
            {/* button for apply*/}
            <div>
              <Button onClick={handleButtonApply}>
                Apply
              </Button>
            </div>
          </div>
          {/* chart */}
          <div>
            {csvArray.length > 0 && <Line options={{ ...options, onClickPoint }} data={chartData} />}
          </div>
        </div>
        <div className='col-span-2'>
          {/* video */}
          <div>
            {videoUrl ?
              (<ReactPlayer
                ref={playerRef}
                url={videoUrl}
                controls={true}
                playing={isPlaying}
                width="auto"
                height=""
                onProgress={stopVideo}
              />) : (
                <div className='h-[200px] w-full m-2 rounded-lg bg-slate-300 flex justify-center items-center'>
                  <p className='text-3xl'>{status}</p>
                </div>
              )
            }
          </div>

          {/* information */}
          <div className='overflow-y-auto h-60 mt-3'>
            <table>
              <tbody>
                {
                  csvArray.filter((item) => item.id === id)
                    .map((item, i) => (
                      <React.Fragment key={i}>
                        {Object.keys(item).map((key) => (
                          key !== 'stimu_num' &&
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{item[key]}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnePersonManyVideo;

