
import { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { useMediaQuery } from 'react-responsive';
import { Tooltip } from 'react-tooltip';
import { ChevronUpIcon, ChevronDownIcon, InformationCircleIcon } from './Icons';
import { MobileModelCard } from './MobileModelCard';

interface ComparisonTableProps {
  detailLevel: 'business' | 'technical';
}

type ModelDataType = {
  [key: string]: string | number | boolean;
}

/**
 * GPT model comparison data with business and technical details
 */
const gptModelsData = {
  business: [
    {
      id: 1,
      model: 'GPT-3.5',
      primaryUse: 'Initial conversation transcription and basic analysis',
      strengths: 'Fast response times, cost-effective for high volume tasks',
      limitations: 'Less nuanced understanding of sales context',
      accuracy: '85%',
    },
    {
      id: 2,
      model: 'GPT-4',
      primaryUse: 'Detailed conversation analysis and insight generation',
      strengths: 'Superior understanding of complex interactions, better reasoning',
      limitations: 'Slower processing for long conversations',
      accuracy: '95%',
    },
    {
      id: 3,
      model: 'Fine-tuned GPT',
      primaryUse: 'Sales-specific analysis and coaching recommendations',
      strengths: 'Specialized in sales methodologies and industry-specific context',
      limitations: 'More resource-intensive to maintain and update',
      accuracy: '98%',
      isSalesWhisper: true,
    },
  ],
  technical: [
    {
      id: 1,
      model: 'GPT-3.5',
      parameters: '175 billion',
      context: '8K tokens',
      trainingData: 'General language corpus to 2021',
      finetuning: 'Base model only',
      responseTime: '<1 second',
      tokenProcessing: '5,000/minute',
    },
    {
      id: 2,
      model: 'GPT-4',
      parameters: '1.76 trillion (estimated)',
      context: '32K tokens',
      trainingData: 'Enhanced dataset with reasoning capabilities',
      finetuning: 'Base model only',
      responseTime: '2-3 seconds',
      tokenProcessing: '3,000/minute',
    },
    {
      id: 3,
      model: 'Fine-tuned GPT',
      parameters: '1.76 trillion (base)',
      context: '32K tokens',
      trainingData: 'GPT-4 base + 100,000+ sales conversations',
      finetuning: 'Optimized for sales intelligence with RLHF',
      responseTime: '2-4 seconds',
      tokenProcessing: '3,000/minute',
      isSalesWhisper: true,
    },
  ],
};

/**
 * Tooltips for technical terms
 */
const tooltips = {
  parameters: 'Number of parameters in the neural network that determine the model\'s capabilities',
  context: 'How much text the model can process in a single request',
  finetuning: 'Process of additional training on specialized data to improve performance in specific domains',
  tokenProcessing: 'Speed at which the model can process text (tokens are word pieces)',
  rlhf: 'Reinforcement Learning from Human Feedback - a technique to align AI with human preferences'
};

/**
 * A component that displays a comparative table of GPT models used in SalesWhisper
 */
export const ComparisonTable = ({ detailLevel }: ComparisonTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const data = useMemo(() => gptModelsData[detailLevel], [detailLevel]);
  
  const columns = useMemo(() => {
    if (detailLevel === 'business') {
      return [
        {
          Header: 'Model',
          accessor: 'model',
          Cell: ({ row }: { row: any }) => (
            <div className="flex items-center">
              <span className="font-medium">{row.original.model}</span>
              {row.original.isSalesWhisper && (
                <span className="ml-2 text-xs text-white bg-primary px-2 py-0.5 rounded">
                  SALESWHISPER
                </span>
              )}
            </div>
          ),
        },
        {
          Header: 'Primary Use',
          accessor: 'primaryUse',
        },
        {
          Header: 'Strengths',
          accessor: 'strengths',
        },
        {
          Header: 'Limitations',
          accessor: 'limitations',
        },
        {
          Header: 'Accuracy',
          accessor: 'accuracy',
          Cell: ({ value }: { value: string }) => (
            <span className="font-medium">{value}</span>
          ),
        },
      ];
    } else {
      return [
        {
          Header: 'Model',
          accessor: 'model',
          Cell: ({ row }: { row: any }) => (
            <div className="flex items-center">
              <span className="font-medium">{row.original.model}</span>
              {row.original.isSalesWhisper && (
                <span className="ml-2 text-xs text-white bg-primary px-2 py-0.5 rounded">
                  SALESWHISPER
                </span>
              )}
            </div>
          ),
        },
        {
          Header: () => (
            <div className="flex items-center">
              <span>Parameters</span>
              <InformationCircleIcon 
                className="ml-1 h-4 w-4 text-gray-500"
                data-tooltip-id="parameters-tooltip"
                data-tooltip-content={tooltips.parameters}
              />
            </div>
          ),
          accessor: 'parameters',
        },
        {
          Header: () => (
            <div className="flex items-center">
              <span>Context Window</span>
              <InformationCircleIcon 
                className="ml-1 h-4 w-4 text-gray-500"
                data-tooltip-id="context-tooltip"
                data-tooltip-content={tooltips.context}
              />
            </div>
          ),
          accessor: 'context',
        },
        {
          Header: 'Training Data',
          accessor: 'trainingData',
        },
        {
          Header: () => (
            <div className="flex items-center">
              <span>Fine-tuning</span>
              <InformationCircleIcon 
                className="ml-1 h-4 w-4 text-gray-500"
                data-tooltip-id="finetuning-tooltip"
                data-tooltip-content={tooltips.finetuning}
              />
            </div>
          ),
          accessor: 'finetuning',
          Cell: ({ value }: { value: string }) => (
            <div>
              {value.includes('RLHF') ? (
                <span>
                  Optimized for sales intelligence with <span className="inline-flex items-center" data-tooltip-id="rlhf-tooltip" data-tooltip-content={tooltips.rlhf}>
                    RLHF
                    <InformationCircleIcon className="ml-1 h-4 w-4 text-gray-500" />
                  </span>
                </span>
              ) : (
                value
              )}
            </div>
          ),
        },
        {
          Header: 'Response Time',
          accessor: 'responseTime',
        },
        {
          Header: () => (
            <div className="flex items-center">
              <span>Token Processing</span>
              <InformationCircleIcon 
                className="ml-1 h-4 w-4 text-gray-500"
                data-tooltip-id="token-tooltip"
                data-tooltip-content={tooltips.tokenProcessing}
              />
            </div>
          ),
          accessor: 'tokenProcessing',
        },
      ];
    }
  }, [detailLevel]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useSortBy
  );
  
  const toggleRowExpanded = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  if (isMobile) {
    return (
      <div className="space-y-4">
        {data.map((model: ModelDataType) => (
          <MobileModelCard 
            key={model.id as number}
            model={model}
            detailLevel={detailLevel}
            isExpanded={!!expandedRows[model.id as number]}
            onToggle={() => toggleRowExpanded(model.id as number)}
          />
        ))}
        {Object.entries(tooltips).map(([key, content]) => (
          <Tooltip key={key} id={`${key}-tooltip`} place="top" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto mb-8">
      <table {...getTableProps()} className="w-full border-collapse">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b"
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                    <span className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronUpIcon className="h-4 w-4" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr 
                {...row.getRowProps()}
                className={`${row.original.isSalesWhisper ? 'bg-primary/5' : 'hover:bg-gray-50'} transition-colors`}
              >
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-4 text-sm text-gray-700 border-b"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {Object.entries(tooltips).map(([key, content]) => (
        <Tooltip key={key} id={`${key}-tooltip`} place="top" />
      ))}
    </div>
  );
};
