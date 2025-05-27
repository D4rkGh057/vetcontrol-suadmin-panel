import React, { useEffect, useState } from 'react';
import { getCompanies } from '../services/companyService';
import { useAppStore } from '../store';
import CompanyTable from '../components/CompanyTable';
import Modal from '../components/Modal';
import CompanyForm from '../components/CompanyForm';

const Companies: React.FC = () => {
  const companies = useAppStore((state) => state.companies);
  const setCompanies = useAppStore((state) => state.setCompanies);
  const loading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const reloadCompanies = () => {
    setLoading(true);
    getCompanies()
      .then(setCompanies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reloadCompanies();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-[#14294b] w-full rounded-lg mb-8 flex items-center px-8 py-4 shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Empresas
        </h1>
      </div>
      <div className="mb-4 flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow"
          onClick={() => setModalOpen(true)}
        >
          Crear Empresa
        </button>
      </div>
      <CompanyTable companies={companies} loading={loading} error={error} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CompanyForm
          onSuccess={() => {
            reloadCompanies();
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Companies;
