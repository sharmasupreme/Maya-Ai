/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, Plus, Trash2, Building2, Utensils, GraduationCap, Stethoscope, Briefcase, Boxes } from 'lucide-react';
import { BusinessConfig, BusinessCategory, CATEGORY_TEMPLATES, BusinessResource } from '../types';

interface DashboardProps {
  config: BusinessConfig;
  onSave: (config: BusinessConfig) => void;
}

export default function Dashboard({ config, onSave }: DashboardProps) {
  const [localConfig, setLocalConfig] = useState<BusinessConfig>(config);

  const handleCategoryChange = (category: BusinessCategory) => {
    const template = CATEGORY_TEMPLATES[category];
    setLocalConfig({
      ...localConfig,
      category,
      description: template.description || localConfig.description,
      services: template.services || localConfig.services,
      faq: template.faq || localConfig.faq,
      resources: template.resources || localConfig.resources,
    });
  };

  const addResource = () => {
    setLocalConfig({ 
      ...localConfig, 
      resources: [...localConfig.resources, { label: "New Resource", total: 0, available: 0 }] 
    });
  };

  const updateResource = (index: number, field: keyof BusinessResource, value: string | number) => {
    const newResources = [...localConfig.resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setLocalConfig({ ...localConfig, resources: newResources });
  };

  const removeResource = (index: number) => {
    setLocalConfig({ ...localConfig, resources: localConfig.resources.filter((_, i) => i !== index) });
  };

  const addService = () => {
    setLocalConfig({ ...localConfig, services: [...localConfig.services, ""] });
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...localConfig.services];
    newServices[index] = value;
    setLocalConfig({ ...localConfig, services: newServices });
  };

  const removeService = (index: number) => {
    setLocalConfig({ ...localConfig, services: localConfig.services.filter((_, i) => i !== index) });
  };

  const addFaq = () => {
    setLocalConfig({ ...localConfig, faq: [...localConfig.faq, { question: "", answer: "" }] });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...localConfig.faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setLocalConfig({ ...localConfig, faq: newFaq });
  };

  const removeFaq = (index: number) => {
    setLocalConfig({ ...localConfig, faq: localConfig.faq.filter((_, i) => i !== index) });
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 overflow-y-auto max-h-[80vh] transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Configure Maya</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tailor Maya's knowledge to your business</p>
        </div>
        <button
          onClick={() => onSave(localConfig)}
          className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Business Category</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Restaurant', 'School', 'Hospital', 'General'] as BusinessCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition-all ${
                    localConfig.category === cat 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400' 
                      : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {cat === 'Restaurant' && <Utensils className="w-4 h-4" />}
                  {cat === 'School' && <GraduationCap className="w-4 h-4" />}
                  {cat === 'Hospital' && <Stethoscope className="w-4 h-4" />}
                  {cat === 'General' && <Building2 className="w-4 h-4" />}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Business Name</label>
            <input
              type="text"
              value={localConfig.name}
              onChange={(e) => setLocalConfig({ ...localConfig, name: e.target.value })}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
              placeholder="e.g. Kathmandu Kitchen"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Description</label>
            <textarea
              value={localConfig.description}
              onChange={(e) => setLocalConfig({ ...localConfig, description: e.target.value })}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-24 resize-none dark:text-white"
              placeholder="Tell Maya about your business..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Phone</label>
              <input
                type="text"
                value={localConfig.contactPhone}
                onChange={(e) => setLocalConfig({ ...localConfig, contactPhone: e.target.value })}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Hours</label>
              <input
                type="text"
                value={localConfig.hours}
                onChange={(e) => setLocalConfig({ ...localConfig, hours: e.target.value })}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Services & FAQ */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Inventory / Resources</label>
              <button onClick={addResource} className="text-orange-600 hover:text-orange-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {(localConfig.resources || []).map((res, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 relative group">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={res.label}
                      onChange={(e) => updateResource(idx, 'label', e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-gray-800 border-none rounded-lg text-xs font-medium focus:ring-1 focus:ring-orange-500 outline-none dark:text-white"
                      placeholder="Resource Name (e.g. Tables)"
                    />
                    <button onClick={() => removeResource(idx)} className="text-gray-300 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 uppercase">Total</span>
                      <input
                        type="number"
                        value={res.total}
                        onChange={(e) => updateResource(idx, 'total', parseInt(e.target.value) || 0)}
                        className="w-full p-2 bg-white dark:bg-gray-800 border-none rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none dark:text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 uppercase">Available</span>
                      <input
                        type="number"
                        value={res.available}
                        onChange={(e) => updateResource(idx, 'available', parseInt(e.target.value) || 0)}
                        className="w-full p-2 bg-white dark:bg-gray-800 border-none rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Services</label>
              <button onClick={addService} className="text-orange-600 hover:text-orange-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {(localConfig.services || []).map((service, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => updateService(idx, e.target.value)}
                    className="flex-1 p-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none dark:text-white"
                  />
                  <button onClick={() => removeService(idx)} className="text-gray-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">FAQ (Maya's Knowledge)</label>
              <button onClick={addFaq} className="text-orange-600 hover:text-orange-700">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {(localConfig.faq || []).map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 relative group">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                    className="w-full p-2 bg-white dark:bg-gray-800 border-none rounded-lg text-xs font-medium focus:ring-1 focus:ring-orange-500 outline-none dark:text-white"
                    placeholder="Question"
                  />
                  <textarea
                    value={item.answer}
                    onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                    className="w-full p-2 bg-white dark:bg-gray-800 border-none rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none h-16 resize-none dark:text-white"
                    placeholder="Answer"
                  />
                  <button 
                    onClick={() => removeFaq(idx)} 
                    className="absolute top-1 right-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
